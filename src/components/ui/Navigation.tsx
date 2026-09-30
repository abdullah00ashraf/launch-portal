'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePuzzle } from '@/context/PuzzleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Cpu, ChevronUp, Layers, Terminal } from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { isFullyDecrypted, setModalOpen, unlockedKeys, setSelectedProduct } = usePuzzle();
  const [showConsoleMenu, setShowConsoleMenu] = useState(false);

  const mainLinks = [
    { name: 'HUB', path: '/' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'ABOUT US', path: '/about' }
  ];

  const consoles = [
    { name: 'Spatial AI', path: '/spatial-ai', key: 'SALSETTE' },
    { name: 'Physics Core', path: '/physics-core', key: 'SOLVER' },
    { name: 'Agent Mesh', path: '/agent-mesh', key: 'NEXUS' },
    { name: 'Tactical Edge', path: '/tactical-edge', key: 'TOWER' }
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex flex-col items-center pointer-events-none">
      {/* Dev Console Floating Sub-Menu */}
      <AnimatePresence>
        {showConsoleMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 p-3 rounded-2xl border border-neutral-900 bg-[#0B0A09]/95 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5 font-mono text-[10px] w-56 pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold border-b border-neutral-900 pb-1.5 mb-1 px-2">
              <Terminal className="w-3 h-3 text-amber-500" />
              <span>ACTIVE COMPILER PORTS</span>
            </div>
            {consoles.map((c) => {
              const isUnlocked = unlockedKeys.includes(c.key);
              return (
                <Link
                  key={c.path}
                  href={c.path}
                  onClick={() => setShowConsoleMenu(false)}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-neutral-900/60 text-neutral-300 hover:text-white transition-colors"
                >
                  <span>{c.name}</span>
                  <span className={isUnlocked ? 'text-green-500 font-bold' : 'text-neutral-600'}>
                    {isUnlocked ? '● VERIFIED' : '○ GATED'}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bottom Dock Capsule */}
      <nav className="pointer-events-auto relative px-5 py-3 rounded-full border border-neutral-900 bg-[#0E0E0C]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center gap-6">
        
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-1.5 font-mono font-bold text-xs text-neutral-200 hover:text-white shrink-0 pr-3 border-r border-neutral-900">
          <Cpu className="w-3.5 h-3.5 text-amber-500" />
          <span className="tracking-tighter">AXIYON</span>
        </Link>

        {/* Primary Links */}
        <div className="flex items-center gap-4 font-mono text-[10px] sm:text-xs">
          {mainLinks.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-2 py-1 font-semibold transition-colors duration-200 ${
                  isActive ? 'text-amber-400' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Sub-menu trigger */}
          <button
            onClick={() => setShowConsoleMenu(!showConsoleMenu)}
            className={`flex items-center gap-1 px-2 py-1 font-mono font-semibold transition-colors duration-200 cursor-pointer ${
              showConsoleMenu ? 'text-amber-400' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span>CONSOLES</span>
            <ChevronUp className={`w-3.5 h-3.5 transform transition-transform duration-200 ${showConsoleMenu ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Action button */}
        <button
          onClick={() => {
            setSelectedProduct('General Inquiry');
            setModalOpen(true);
          }}
          className={`flex items-center gap-1.5 font-mono text-[10px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(0,0,0,0.3)] ${
            isFullyDecrypted
              ? 'text-amber-400 border-amber-500/30 bg-amber-950/20 hover:bg-amber-950/40 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] animate-pulse'
              : 'text-neutral-400 border-neutral-900 bg-neutral-950/40 hover:border-neutral-800'
          }`}
        >
          {isFullyDecrypted ? (
            <Shield className="w-3.5 h-3.5 text-amber-500" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-500" />
          )}
          <span>GET QUOTE</span>
          <span className="text-neutral-500">({unlockedKeys.length}/4)</span>
        </button>
      </nav>
    </div>
  );
};
