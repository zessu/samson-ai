import { useEffect, useRef } from "react";

export function useWebSocket(
  userid: string | undefined,
  markCompleted: () => void
) {
  const socketRef = useRef<WebSocket | null>(null);
  /* use flag to avoid dev mode warnings from react mounting twice and socket being closed*/
  const isConnected = useRef(false);

  useEffect(() => {
    if (!userid) return;

    if (!socketRef.current && !isConnected.current) {
      const socket = new WebSocket(`ws://localhost:3000/ws?userId=${userid}`);
      socketRef.current = socket;
      isConnected.current = true;

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        markCompleted();
        console.log("Received from server:", data);
      };

      socket.onclose = (event) => {
        console.log("WebSocket disconnected", {
          reason: event.reason,
          code: event.code,
          wasClean: event.wasClean,
        });
      };

      socket.onerror = (err) => {
        console.error("WebSocket error", err);
      };
    }

    return () => {
      if (socketRef.current && isConnected.current === false) {
        socketRef.current.close();
        socketRef.current = null;
        isConnected.current = false;
      }
    };
  }, [userid]);

  return {
    socketRef,
  };
}
