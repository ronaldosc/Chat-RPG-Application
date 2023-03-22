import { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketContext = createContext<Partial<WebSocket | undefined>>(
  {},
);

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [websocket, setWebsocket] = useState<WebSocket>();

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:5001');
    setWebsocket(newSocket);
    newSocket.onopen = () => {
      const message = {
        action: 'join-feedRoom',
        data: {
          chatRoom: 'feedRoom',
          token: localStorage.getItem('token')?.toString(),
          message: 'ola',
        },
      };
      newSocket?.send(JSON.stringify(message));
    };

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={websocket}>
      {children}
    </WebSocketContext.Provider>
  );
};
export const useWebSocket = () => useContext(WebSocketContext);
