import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchActive?: boolean;
}

export const GlitchText = ({ text, className = "", glitchActive = false }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+{}:\"<>?,./;'[]-=";

  useEffect(() => {
    if (!glitchActive) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < text.length / 2 && Math.random() > 0.8) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            if (Math.random() > 0.95) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join("")
      );
    }, 100);

    return () => clearInterval(interval);
  }, [text, glitchActive]);

  return (
    <motion.span 
      className={`relative inline-block ${className}`}
      transition={{ duration: 0.2 }}
    >
      {displayText}
    </motion.span>
  );
};
