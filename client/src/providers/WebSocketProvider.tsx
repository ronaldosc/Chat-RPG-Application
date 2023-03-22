import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserProvider';

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketContext = createContext<Partial<WebSocket | undefined>>(
  {},
);

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const { token } = useUser();
  const [websocket, setWebsocket] = useState<WebSocket>();

  
  useEffect(() => {
    if (token) {
      const newSocket = new WebSocket('wss://localhost:5000');
      setWebsocket(newSocket);

      newSocket.onopen = () => {
        console.log('socket opened');

        const message = {
          action: 'join-feedRoom',
          data: {
            chatRoom: 'feedRoom',
            token,
            message: 'ola',
          },
        };
        newSocket?.send(JSON.stringify(message));
      };
    } else {
      websocket?.close();
      setWebsocket(undefined);
    }
  }, [token]);

  return (
    <WebSocketContext.Provider value={websocket}>
      {children}
    </WebSocketContext.Provider>
  );
};
export const useWebSocket = () => useContext(WebSocketContext);
