// webhook-server.js
import express from 'express';
import fs from 'fs/promises';

const app = express();
const PORT = 3000;

// Simple file storage for webhooks
const WEBHOOKS_FILE = './webhooks.json';

// Basic event types
const EVENTS = ['payment_received', 'payment_processed', 'invoice_created', 'invoice_paid'];

// Middleware to parse JSON
app.use(express.json());

// Load webhooks from file
async function loadWebhooks() {
  try {
    const data = await fs.readFile(WEBHOOKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with empty array
    await fs.writeFile(WEBHOOKS_FILE, JSON.stringify([]), 'utf8');
    return [];
  }
}

// Save webhooks to file
async function saveWebhooks(webhooks) {
  await fs.writeFile(WEBHOOKS_FILE, JSON.stringify(webhooks), 'utf8');
}

// Home page
app.get('/', (req, res) => {
  res.send('Webhook Server is running');
});

// Register a new webhook
app.post('/register', async (req, res) => {
  const { url, events } = req.body;
  
  // Basic validation
  if (!url) {
    return res.status(400).send('URL is required');
  }
  
  // Filter valid events
  const validEvents = Array.isArray(events) ? 
    events.filter(e => EVENTS.includes(e)) : [];
  
  if (validEvents.length === 0) {
    return res.status(400).send(`At least one valid event is required. Valid events: ${EVENTS.join(', ')}`);
  }
  
  // Add webhook to storage
  const webhooks = await loadWebhooks();
  
  // Check if webhook already exists
  const existingIndex = webhooks.findIndex(w => w.url === url);
  if (existingIndex >= 0) {
    webhooks[existingIndex].events = validEvents;
  } else {
    webhooks.push({ url, events: validEvents });
  }
  
  await saveWebhooks(webhooks);
  res.status(200).send('Webhook registered successfully');
});

// Unregister a webhook
app.delete('/unregister', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).send('URL is required');
  }
  
  // Remove webhook from storage
  const webhooks = await loadWebhooks();
  const filteredWebhooks = webhooks.filter(w => w.url !== url);
  
  if (webhooks.length === filteredWebhooks.length) {
    return res.status(404).send('Webhook not found');
  }
  
  await saveWebhooks(filteredWebhooks);
  res.send('Webhook unregistered successfully');
});

// List all webhooks
app.get('/webhooks', async (req, res) => {
  const webhooks = await loadWebhooks();
  res.json(webhooks);
});

// Call a webhook
async function callWebhook(url, event, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, data })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Ping endpoint to test webhooks
app.get('/ping', async (req, res) => {
  const webhooks = await loadWebhooks();
  
  if (webhooks.length === 0) {
    return res.send('No webhooks registered');
  }
  
  // Call each webhook with a ping event
  for (const webhook of webhooks) {
    await callWebhook(webhook.url, 'ping', { message: 'You have been pinged by Lasses Webhook' });
  }
  
  res.send(`Ping sent to ${webhooks.length} webhooks`);
});

// Trigger a specific event
app.post('/trigger/:eventType', async (req, res) => {
  const { eventType } = req.params;
  
  if (!EVENTS.includes(eventType)) {
    return res.status(400).send(`Invalid event type. Valid events: ${EVENTS.join(', ')}`);
  }
  
  const webhooks = await loadWebhooks();
  const eventData = req.body || {};
  
  // Count successful calls
  let successCount = 0;
  
  // Call each webhook that subscribes to this event
  for (const webhook of webhooks) {
    if (webhook.events.includes(eventType)) {
      const success = await callWebhook(webhook.url, eventType, eventData);
      if (success) successCount++;
    }
  }
  
  res.send(`Event ${eventType} triggered. ${successCount} webhooks notified.`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});