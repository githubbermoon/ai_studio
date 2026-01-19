
import React, { useState, useRef, useEffect } from 'react';
import { askMLAssistant } from '../services/geminiService';
import { Message } from '../types';

const MLAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your ML project assistant. Ask me anything about neural networks, data engineering, or the projects in this portfolio.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await askMLAssistant(userMsg);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="glass w-80 md:w-96 h-[500px] rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-sky-500/30">
          <div className="bg-sky-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-robot"></i>
              <span className="font-bold">ML Expert Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-sky-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about ML..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500 text-white"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <i className="fa-solid fa-robot text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default MLAssistant;
