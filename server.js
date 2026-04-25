const WebSocket = require("ws");
const PORT = process.env.PORT || 8080;
// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: PORT });

console.log("WebSocket server is running on ws://localhost:" + PORT);

// Connection event handler
wss.on("connection", (ws) => {

  ws.id=Math.random().toString(36).substr(2, 9); // Gerar um ID único 

  ws.send(
    JSON.stringify({
      type: "SYSTEM",
      id: ws.id,
      message: `Bem-vindo, User ${ws.id} 😜!`,
    }),
  );

 ws.on("message", (data) => {
   // O 'data' chega como Buffer, precisamos converter para String
   const mensagem = data.toString();

   wss.clients.forEach((client) => {
     if (client.readyState === WebSocket.OPEN) {
       client.send(JSON.stringify({ type:'USER', id: ws.id, message: mensagem, timestamp: new Date().toISOString()}));
     }
   });
 });

  // Close event handler
  ws.on("close", () => {
    console.log("Client disconnected");
  });
  
});
