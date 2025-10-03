import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';
import { SparklesIcon, SendIcon, CloseIcon } from './icons/Icons';
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Simple markdown-to-HTML
const formatResponse = (text: string) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')       // Italics
        .replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-sm rounded px-1 py-0.5">$1</code>')   // Inline code
        .replace(/\n/g, '<br />');                  // Newlines
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const initializeChat = useCallback(async () => {
        setError(null);
        if (!process.env.API_KEY) {
            setError("La clave de API no está configurada. El chatbot no puede funcionar.");
            console.error("API_KEY environment variable not set.");
            return;
        }
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: AI_SYSTEM_INSTRUCTION,
                },
            });
        } catch (err) {
            console.error("Error initializing chat:", err);
            setError("No se pudo iniciar el asistente de IA. Por favor, revisa la configuración.");
        }
    }, []);

    useEffect(() => {
        if (isOpen && !chatRef.current) {
            initializeChat();
        }
    }, [isOpen, initializeChat]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;
        
        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await chatRef.current.sendMessage({ message: input });
            const modelMessage: ChatMessage = { 
                role: 'model', 
                text: response.text,
            };
            setMessages(prev => [...prev, modelMessage]);
        } catch (err) {
            console.error("Error sending message:", err);
            setError("Lo siento, ocurrió un error al procesar tu solicitud.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-110 z-50"
                aria-label="Abrir asistente de IA"
            >
                {isOpen ? <CloseIcon /> : <SparklesIcon />}
            </button>
            
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[500px] bg-white rounded-lg shadow-2xl flex flex-col animate-slide-in-up z-50">
                    <header className="flex items-center justify-between p-4 bg-gray-100 border-b rounded-t-lg">
                        <h3 className="font-bold text-lg text-gray-800">Asistente de IA</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                            <CloseIcon />
                        </button>
                    </header>
                    
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.length === 0 && !isLoading && !error && (
                            <div className="text-center text-gray-500 text-sm p-4">
                                <p>¡Hola! Soy tu asistente de IA. Pregúntame sobre reanimación neonatal, dosis, equipo o cualquier duda que tengas.</p>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                                <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: formatResponse(msg.text) }}></p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start mb-3">
                                 <div className="max-w-[80%] p-3 rounded-lg bg-white shadow-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                         {error && (
                            <div className="text-center text-red-500 text-sm p-2 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-lg">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onKeyPress={(e) => {
                                    if(e.key === 'Enter' && !e.shiftKey) {
                                        handleSendMessage(e as any);
                                    }
                                }}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Escribe tu pregunta..."
                                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                disabled={isLoading || !!error}
                                aria-label="Entrada de mensaje"
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-1 flex items-center justify-center w-10 h-10 text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-blue-100 rounded-full transition-colors"
                                disabled={isLoading || !input.trim() || !!error}
                                aria-label="Enviar mensaje"
                            >
                               <SendIcon />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;