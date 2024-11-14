const WebSocket = require('ws');

// Create a WebSocket server on the specified port
const PORT = process.env.PORT || 8080; // Render dynamically assigns a port
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});

// Handle incoming WebSocket connections
wss.on('connection', (ws) => {
    console.log('A client connected.');

    // Broadcast incoming messages to all connected clients
    ws.on('message', (message) => {
        console.log('Received:', message);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});
