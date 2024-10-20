import WebSocket, { Server } from "ws"

const server = new Server({ port: 8080 })
const clients: { ws: WebSocket; name: string }[] = []

server.on("connection", (ws: WebSocket) => {
  let clientName: string

  ws.on("message", (message: string) => {
    if (!clientName) {
      // Устанавливаем имя клиента при первом сообщении
      clientName = message
      clients.push({ ws, name: clientName })
      console.log(`${clientName} connected`)
    } else {
      console.log(`Received message from ${clientName}: ${message}`)
      const formattedMessage = `${clientName}: ${message}`
      // Рассылаем сообщение всем клиентам
      clients.forEach((client) => {
        if (client.ws !== ws && client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(formattedMessage)
        }
      })
    }
  })

  ws.on("close", () => {
    console.log(`${clientName} disconnected`)
    // Убираем клиента из списка
    const index = clients.findIndex((client) => client.ws === ws)
    if (index !== -1) {
      clients.splice(index, 1)
    }
  })
})

console.log("WebSocket server is running on ws://localhost:8080")
