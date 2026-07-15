import { motion } from 'framer-motion';
import SpecularButton from './SpecularButton.jsx';

const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
    >
      {/* Bouton 1 : Voir mes projets */}
      <div className="w-full sm:w-auto transition-transform duration-300 hover:scale-[1.03]">
        <SpecularButton
          size="lg"
          radius={12}
          tint="#7C3AED" /* Fond violet de marque */
          tintOpacity={0.9}
          textColor="#ffffff"
          lineColor="#ffffff" /* Ligne blanche brillante qui suit le curseur */
          baseColor="#7C3AED"
          intensity={1.2}
          thickness={1.5}
          followMouse={true}
          autoAnimate={false}
          onClick={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full sm:w-auto shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        >
          <span>Voir mes projets</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[0.5px]">
            <path d="m12 5 7 7-7 7" />
            <path d="M5 12h14" />
          </svg>
        </SpecularButton>
      </div>

      {/* Bouton 2 : Discuter avec mon IA (Copie conforme du style du bouton 1) */}
      <div className="w-full sm:w-auto transition-transform duration-300 hover:scale-[1.03]">
        <SpecularButton
          size="lg"
          radius={12}
          tint="#7C3AED" /* Même fond violet */
          tintOpacity={0.9}
          textColor="#ffffff"
          lineColor="#ffffff" /* Même ligne blanche interactive */
          baseColor="#7C3AED"
          intensity={1.2}
          thickness={1.5}
          followMouse={true} /* Suit désormais aussi la souris */
          autoAnimate={false}
          onClick={() => window.location.href = '/chat'}
          className="w-full sm:w-auto shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        >
          <span>Discuter avec mon IA</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M9 13h.01" />
            <path d="M15 13h.01" />
            <path d="M12 17h10" />
          </svg>
        </SpecularButton>
      </div>
    </motion.div>
  );
};

export default HeroButtons;