import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu } from 'lucide-react';

const HeroDescription = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      className="relative max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border border-white/10 bg-brand-bg/30 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden"
    >

      <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-purple/10 border border-brand-purple/30 text-brand-purple shadow-sm">
          <Terminal className="w-3.5 h-3.5" />
          Futur Développeur Logiciel
        </span>
      </div>

      <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Étudiant en{' '}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue bg-[size:200%_auto] animate-[gradientShift_8s_ease_infinite]">
          BUT Informatique
        </span>{' '}
        à l’IUT d’Arles. Passionné par l'algorithmique, la conception d'applications robustes et l'administration de systèmes faits maison.
      </p>


    </motion.div>
  );
};

export default HeroDescription;