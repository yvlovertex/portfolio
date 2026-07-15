import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Bot, User, RefreshCw } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Salut Julyan ! Je suis ton assistant virtuel. Pour l'instant, je tourne en local sur ton navigateur, mais j'ai hâte d'être hébergé sur ton Raspberry Pi. Dis-moi ce que tu veux tester !"
  }
];

export default function ChatInterface() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulation de la réponse de l'IA après 1.5s
    setTimeout(() => {
      setIsTyping(false);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Message reçu ! "Julyan a dit : ${userMessage.text}". Dès que tu m'auras connecté à ton serveur sur ton Raspberry Pi, je serai capable de traiter cette demande intelligemment !`
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden">
      
      {/* En-tête du chat */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-3">
          <a 
            href="/" 
            className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
            title="Retour à l'accueil"
          >
            <ArrowLeft className="w-5 h-5" />
          </a>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-purple/20 border border-brand-purple/30 rounded-xl text-brand-purple animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm md:text-base leading-none">Julyan's AI Assistant</h2>
              <span className="text-xs text-white/40 flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sandbox Local
              </span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors"
          title="Réinitialiser la conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Zone d'affichage des messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div className={`p-2 rounded-xl h-9 w-9 shrink-0 flex items-center justify-center border ${
                msg.sender === 'user' 
                  ? 'bg-white/5 border-white/10 text-white' 
                  : 'bg-brand-purple/10 border-brand-purple/30 text-brand-purple'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-brand-purple text-white rounded-tr-none'
                  : 'bg-white/5 border border-white/10 text-white/95 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Indicateur de frappe de l'IA */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 mr-auto max-w-[80%]"
            >
              <div className="p-2 rounded-xl h-9 w-9 shrink-0 flex items-center justify-center border bg-brand-purple/10 border-brand-purple/30 text-brand-purple">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 bg-white/5 border border-white/10 text-white/50 rounded-2xl rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Formulaire de saisie */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Envoyez un message pour tester..."
          className="flex-1 bg-white/5 border border-white/10 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all"
        />
        <button
          type="submit"
          className="p-3 bg-brand-purple hover:bg-brand-purple/90 active:scale-95 text-white rounded-xl transition-all flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}