import { useEffect, useRef } from "react";

export function useWebSocket(
  userid: string | undefined,
  markCompleted: () => void
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!userid) return;

    if (!socketRef.current) {
      const socket = new WebSocket(`ws://localhost:3000/ws?userId=${userid}`);
      socketRef.current = socket;

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
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [userid]);
}
