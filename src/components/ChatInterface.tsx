
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  type: "bot" | "user";
  content: string;
  draft?: string;
  isComplete?: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  placeholder?: string;
  language?: string;
  className?: string;
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  onSendMessage, 
  placeholder = "Type your message...",
  language = "english",
  className = "",
  isLoading = false
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && chatContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest"
      });
    }
  };

  useEffect(() => {
    // Prevent document scrolling
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('scroll', preventScroll);
    };
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      
      // Prevent any page scrolling
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`} onClick={(e) => e.stopPropagation()}>
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-4 scroll-smooth"
        style={{ 
          maxHeight: 'calc(100vh - 300px)',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain'
        }}
        onScroll={(e) => e.stopPropagation()}
      >
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] lg:max-w-[75%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-800 border shadow-sm'
            }`}>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{message.content}</pre>
              {message.draft && (
                <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
                  <pre className="whitespace-pre-wrap font-mono text-xs max-h-40 overflow-y-auto">{message.draft}</pre>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      const element = document.createElement('a');
                      const file = new Blob([message.draft!], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = 'Application.txt';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border shadow-sm p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <span className="text-sm text-gray-500 ml-2">Typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSend} className="flex space-x-2 bg-white p-2 rounded-lg border">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          className="flex-1"
          disabled={isLoading}
          onClick={(e) => e.stopPropagation()}
        />
        <Button 
          type="submit"
          className="px-4"
          disabled={isLoading || !inputValue.trim()}
          onClick={(e) => {
            e.stopPropagation();
            handleSend(e);
          }}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
