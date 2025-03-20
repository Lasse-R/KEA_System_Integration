import './style.css'

let localStream;
let remoteStream;
let PeerConnection;

const servers = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302']
    }
  ]
}

async function init() {
  localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  document.getElementById('localVideo').srcObject = localStream;
}

async function createPeerConnection(sdpOfferTextAreaId) {
  PeerConnection = new RTCPeerConnection(servers);

  remoteStream = new MediaStream();
  document.getElementById('remoteVideo').srcObject = remoteStream;

  localStream.getTracks().forEach(track => PeerConnection.addTrack(track, localStream));

  // listen to remote tracks from the peer
  PeerConnection.ontrack = (event) => { 
    event.Streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
  };

  PeerConnection.onicecandidate = (event) => {
    if(event.candidate) {
      document.getElementById(sdpOfferTextAreaId).textContent = JSON.stringify(PeerConnection.localDescription);
    }
  }

}

async function createOffer() {
  if(!localStream) {
    return alert('no local stream');
  }

  const offer = await createPeerConnection("sdpOfferTextArea");

  await PeerConnection.setLocalDescription(offer);
}

async function createAnswer() {
  await createPeerConnection("sdpAnswerTextArea");

  let offer = document.getElementById('sdpOfferTextArea').value;
  if (!offer) return alert('no offer to answer')
  offer = JSON.parse(offer);

  await PeerConnection.setRemoteDescription(offer);

  const answer = await PeerConnection.createAnswer();
  await PeerConnection.setLocalDescription(answer);

  document.getElementById('sdpAnswerTextArea').textContent = JSON.stringify(answer);

}

async function addAnswer() {
  let answer = document.getElementById('sdpAnswerTextArea').value;
  if (!answer) return alert('no answer to add');

  answer = JSON.parse(answer);

  if(!PeerConnection.currentRemoteDescription) {
    await PeerConnection.setRemoteDescription(answer);
  }

}

init();

document.getElementById('createOfferButton').addEventListener('click', createOffer);
document.getElementById('createAnswerButton').addEventListener('click', createAnswer);
document.getElementById('addAnswerButton').addEventListener('click', addAnswer);
