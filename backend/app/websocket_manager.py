from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):
        self.connections: dict[int, list[WebSocket]] = {}

    async def connect(
        self,
        conversation_id: int,
        websocket: WebSocket
    ):
        await websocket.accept()

        if conversation_id not in self.connections:
            self.connections[conversation_id] = []

        self.connections[conversation_id].append(websocket)

    def disconnect(
        self,
        conversation_id: int,
        websocket: WebSocket
    ):
        if conversation_id not in self.connections:
            return

        if websocket in self.connections[conversation_id]:
            self.connections[conversation_id].remove(websocket)

        if not self.connections[conversation_id]:
            del self.connections[conversation_id]

    async def broadcast(
        self,
        conversation_id: int,
        message: dict
    ):
        connections = self.connections.get(
            conversation_id,
            []
        )

        for websocket in connections:
            await websocket.send_json(message)


manager = ConnectionManager()