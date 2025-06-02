import './style.css'; // Import CSS styles for the UI

// Global variables to hold media streams and WebRTC peer connection
let localStream;
let remoteStream;
let peerConnection;

// STUN server config for NAT traversal
const servers = {
	iceServers: [
		{
			urls: ['stun:stun1.l.google.com:19302'] // Google's public STUN server
		}
	]
};

// Initializes the user's webcam and microphone
async function init() {
	// Get access to user's camera and microphone
	localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
	// Display the local stream in the video element
	document.getElementById('local-video').srcObject = localStream;
}

// Sets up a new RTCPeerConnection and prepares to send/receive tracks
async function createPeerConnection(sdpOfferTextAreaId) {
	peerConnection = new RTCPeerConnection(servers); // Create peer connection with STUN server config

	remoteStream = new MediaStream(); // Create a new MediaStream to hold incoming tracks
	document.getElementById('remote-video').srcObject = remoteStream; // Display remote stream

	// Add each track (audio/video) from the local stream to the connection
	localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

	// When a remote track is received, add it to the remote stream
	peerConnection.ontrack = event => {
		event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
	};

	// When an ICE candidate is found, update the corresponding text area with the local SDP
	peerConnection.onicecandidate = event => {
		if (event.candidate) {
			document.getElementById(sdpOfferTextAreaId).textContent = JSON.stringify(peerConnection.localDescription);
		}
	};
}

// Creates an SDP offer and displays it in the text area
async function createOffer() {
	if (!localStream) {
		return;
	}

	// Create peer connection (and UI bindings)
	await createPeerConnection('sdpOfferTextArea');

	// Create an SDP offer
	const offer = await peerConnection.createOffer();
	// Set the local description to the generated offer
	await peerConnection.setLocalDescription(offer);
}

// Responds to an offer with an answer and displays it
async function createAnswer() {
	// Create peer connection (and UI bindings)
	await createPeerConnection('sdpAnswerTextArea');

	// Get the offer from the UI
	let offer = document.getElementById('sdpOfferTextArea');
	if (!offer) {
		return alert('Offer is required');
	}
	offer = JSON.parse(offer.value); // Parse the offer from JSON string

	// Set the remote description to the offer
	await peerConnection.setRemoteDescription(offer);

	// Create an SDP answer in response to the offer
	const answer = await peerConnection.createAnswer();
	// Set it as the local description
	await peerConnection.setLocalDescription(answer);

	// Show the answer in the text area so it can be copied to the other peer
	document.getElementById('sdpAnswerTextArea').textContent = JSON.stringify(answer);
}

// Accepts an answer and completes the connection
async function addAnswer() {
	// Get the answer from the UI
	let answer = document.getElementById('sdpAnswerTextArea').value;
	if (!answer) {
		return alert('Answer is required');
	}
	answer = JSON.parse(answer); // Parse JSON

	// If the remote description is not already set, apply the answer
	if (!peerConnection.currentRemoteDescription) {
		peerConnection.setRemoteDescription(answer);
	}
}

// Start the media stream when the page loads
init();

// Wire up buttons to their respective actions
document.getElementById('create-offer-button').addEventListener('click', createOffer);
document.getElementById('create-answer-button').addEventListener('click', createAnswer);
document.getElementById('add-answer-button').addEventListener('click', addAnswer);
