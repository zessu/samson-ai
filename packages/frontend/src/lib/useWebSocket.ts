import { useEffect } from "react";

export function useWebSocket(
  userid: string | undefined,
  markCompleted: () => void
) {
  useEffect(() => {
    if (!userid) return;

    const socket = new WebSocket(`ws://localhost:3000/ws?userId=${userid}`);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      markCompleted();
      console.log("Received from server:", data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      socket.close();
    };
  }, [userid]);
}
