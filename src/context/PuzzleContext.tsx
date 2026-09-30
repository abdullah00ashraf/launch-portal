'use client';

import React, { createContext, useContext, useState } from 'react';
import { PuzzleContextType } from '@/types';

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

const VALID_KEYS = ['SALSETTE', 'SOLVER', 'NEXUS', 'TOWER'];
const GLYPHS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'X', 'Ω', '█', '⚡', '☣', '⚙'];

const getHash = (char: string): number => {
  return char.charCodeAt(0);
};

const scrambleText = (text: string, count: number): string => {
  return text.split('').map((char) => {
    if ([':', '-', ' ', '/'].includes(char)) return char;
    const h = getHash(char);
    if ((h % 4) < count) {
      return char;
    } else {
      const idx = Math.floor(Math.random() * GLYPHS.length);
      return GLYPHS[idx];
    }
  }).join('');
};

export const PuzzleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedKeys, setUnlockedKeys] = useState<string[]>([]);
  const [isFullyDecrypted, setIsFullyDecrypted] = useState(false);
  const [isConnectUnlocked, setIsConnectUnlocked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('General Inquiry');

  // Sync decryption status on mount
  React.useEffect(() => {
    async function syncStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        if (data.unlockedKeys) {
          setUnlockedKeys(data.unlockedKeys);
          if (data.unlockedKeys.length === VALID_KEYS.length) {
            setIsFullyDecrypted(true);
            setIsConnectUnlocked(true);
          }
        }
      } catch (err) {
        console.error('Error syncing status from backend:', err);
      }
    }
    syncStatus();
  }, []);

  const unlockKey = (key: string) => {
    const uppercaseKey = key.toUpperCase().trim();
    if (VALID_KEYS.includes(uppercaseKey) && !unlockedKeys.includes(uppercaseKey)) {
      setUnlockedKeys((prev) => {
        const updated = [...prev, uppercaseKey];
        if (updated.length === VALID_KEYS.length) {
          setIsFullyDecrypted(true);
          setIsConnectUnlocked(true);
        }
        return updated;
      });
    }
  };

  return (
    <PuzzleContext.Provider value={{
      unlockedKeys,
      unlockKey,
      isFullyDecrypted,
      isConnectUnlocked,
      isModalOpen,
      setModalOpen,
      scrambleText,
      selectedProduct,
      setSelectedProduct
    }}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  return context;
};
