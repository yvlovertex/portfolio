import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const SplitText = ({
  text = "",
  className = "",
  delay = 50,
  duration = 0.8,
  ease = "power4.out",
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0 },
  tag = "p",
  textAlign = "center"
}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Sélectionne toutes les lettres isolées
    const chars = containerRef.current.querySelectorAll('.animate-char');
    
    if (chars.length > 0) {
      gsap.fromTo(
        chars,
        { ...from },
        {
          ...to,
          duration: duration,
          ease: ease,
          stagger: delay / 1000,
          willChange: 'transform, opacity',
          force3D: true
        }
      );
    }
  }, { scope: containerRef, dependencies: [text] });

  const Tag = tag;
  
  // Sépare le texte en mots, puis chaque mot en lettres pour garder les espaces intacts
  const words = text.split(" ");

  return (
    <Tag 
      ref={containerRef} 
      className={`inline-block ${className}`}
      style={{ textAlign, width: '100%' }}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} class="inline-block white-space-nowrap" style={{ whiteSpace: 'nowrap' }}>
          {word.split("").map((char, charIdx) => (
            <span 
              key={charIdx} 
              className="animate-char inline-block opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              {char}
            </span>
          ))}
          {/* Ajoute un espace insécable entre les mots sauf pour le dernier */}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;