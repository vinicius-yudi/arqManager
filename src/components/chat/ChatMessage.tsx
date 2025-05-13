import React from 'react';
import Avatar from '../ui/Avatar';
import { Message, User } from '../../types';

interface ChatMessageProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, isCurrentUser }) => {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <div className="mr-2 mt-1">
          <Avatar src={sender.avatar} name={sender.name} size="sm" />
        </div>
      )}
      
      <div className={`max-w-[70%] ${isCurrentUser ? 'order-1' : 'order-2'}`}>
        {!isCurrentUser && (
          <p className="text-xs text-gray-500 mb-1">{sender.name}</p>
        )}
        
        <div className={`p-3 rounded-lg ${
          isCurrentUser 
            ? 'bg-[#0c9fa6] text-white rounded-tr-none' 
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
        
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-right' : ''} text-gray-500`}>
          {formattedTime}
          {isCurrentUser && message.read && (
            <span className="ml-1 text-blue-500">✓</span>
          )}
        </p>
      </div>
      
      {isCurrentUser && (
        <div className="ml-2 mt-1 order-2">
          <Avatar src={sender.avatar} name={sender.name} size="sm" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;