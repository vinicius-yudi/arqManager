import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import Button from '../ui/Button';
import ChatMessage from './ChatMessage';
import { Message, User } from '../../types';
import { currentUser } from '../../data/mockData';

interface ChatWindowProps {
  messages: Message[];
  client: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, client }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, we'd send the message to the API here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900">Chat com {client.name}</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            sender={message.senderId === currentUser.id ? currentUser : client}
            isCurrentUser={message.senderId === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end">
          <textarea
            className="flex-grow bg-gray-100 rounded-lg resize-none p-3 focus:outline-none focus:ring-2 focus:ring-[#334e68] min-h-[80px] max-h-[120px] overflow-auto"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="flex flex-col gap-2 ml-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="p-2" 
              icon={<Paperclip size={18} />}
              aria-label="Anexar arquivo"
            />
            <Button 
              variant="primary" 
              size="sm" 
              className="p-2" 
              icon={<Send size={18} />}
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              aria-label="Enviar mensagem"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;