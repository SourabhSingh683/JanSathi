
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-4"
        style={{ scrollBehavior: 'smooth', maxHeight: 'calc(100vh - 300px)' }}
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
                    onClick={() => {
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
      
      <div className="flex space-x-2 bg-white p-2 rounded-lg border">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSend} 
          className="px-4"
          disabled={isLoading || !inputValue.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
