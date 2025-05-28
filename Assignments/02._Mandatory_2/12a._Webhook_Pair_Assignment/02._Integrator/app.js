import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// Not really needed for this assignment, but good practice
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Middleware to parse incoming JSON requests
app.use(express.json());


/*
-------------- Endpoints to test own webhook server ------------------
*/

app.post('/register-webhook', async (req, res) => {
  const webhookUrl = 'https://localhost:8080/webhook';
  const events = ['payment_received'];

  try {
    await axios.post('https://rugaard.loca.lt/register', {
      url: webhookUrl,
      events: events,
    });

    res.status(200).json({ message: 'Webhook registered successfully!' });
  } catch (error) {
    console.error('Error registering webhook:', error);
    res.status(500).json({ message: 'Failed to register webhook.' });
  }
});


// Endpoint to listen for incoming webhooks (event data)
app.post('/webhook', (req, res) => {
    const { eventType, data } = req.body;
  
    console.log('Received webhook:', eventType);
    console.log('Data:', data);
  
    if (eventType === 'payment_received') {
      // Handle the 'payment_received' event
      console.log('Payment received:', data.amount);
    }
  
    // Respond with 200 OK to acknowledge receipt
    res.status(200).json({ message: 'Webhook received successfully.' });
});

/*
--------------- Endpoint to test David's webhook server ----------------
*/


app.post('/david-user-created', async (req, res) => {
    const webhookUrl = 'https://rugaard.loca.lt/david-webhook';
    const event = 'user-created';
  
    try {
      await axios.post('https://12a-_webhook.sid-doro-hd.workers.dev/users/webhooks', {
        url: webhookUrl,
        eventKind: event,
      });
  
      res.status(200).json({ message: 'Webhook registered successfully!' });
    } catch (error) {
      console.error('Error registering webhook:', error);
      res.status(500).json({ message: 'Failed to register webhook.' });
    }
  });





const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
}
);