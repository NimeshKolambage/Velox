import React, { useState, useEffect, useCallback, useRef } from 'react';

const DecryptedText = ({ 
  text, 
  speed = 80, // Slower default speed
  delay = 500, 
  className = "", 
  loop = true, 
  loopDelay = 3000 
}) => {
  const [decrypted, setDecrypted] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const decrypt = useCallback(() => {
    let iteration = 0;
    
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDecrypted(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        
        // If loop is enabled, restart after a delay
        if (loop) {
          timeoutRef.current = setTimeout(() => {
            decrypt();
          }, loopDelay);
        }
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, speed, loop, loopDelay]);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      decrypt();
    }, delay);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [decrypt, delay]);

  return <span className={className}>{decrypted || text.replace(/./g, ' ')}</span>;
};

export default DecryptedText;
