'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePuzzle } from '@/context/PuzzleContext';
import { ThreeCanvasStub } from '../webgl/ThreeCanvasStub';
import { Play, Check, Terminal, Code, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PillarLayoutProps {
  title: string;
  description: string;
  codeSnippet: string;
  targetKey: string;
  color?: string;
  consoleActionLabel?: string;
  consoleCommandPrompt?: string;
  consoleSuccessLog?: string;
  placeholderParam?: string;
  onUnlockSecret?: (param: string) => boolean; // custom validation check if any
}

export const PillarLayout: React.FC<PillarLayoutProps> = ({
  title,
  description,
  codeSnippet,
  targetKey,
  color = '#22d3ee',
  consoleActionLabel = 'EXECUTE SYSTEM AUDIT',
  consoleCommandPrompt = 'sys_audit --validate',
  consoleSuccessLog = 'AUDIT VERIFICATION SUCCESSFUL: TOKEN DECRYPTED.',
  placeholderParam = '',
  onUnlockSecret
}) => {
  const { unlockKey, unlockedKeys, setSelectedProduct, setModalOpen } = usePuzzle();
  const isUnlocked = unlockedKeys.includes(targetKey);

  const [inputVal, setInputVal] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [auditSuccess, setAuditSuccess] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [auditLogs]);

  const handleAudit = async () => {
    if (isAuditing || isUnlocked) return;

    // Custom verify hook callback
    if (onUnlockSecret) {
      const isValid = onUnlockSecret(inputVal);
      if (!isValid) {
        setAuditLogs(['[ERROR] ENVIRONMENT PARAMETERS INVALID. CORRECTION FAILED.']);
        setIsAuditing(false);
        return;
      }
    }

    setIsAuditing(true);
    setAuditLogs([]);
    setAuditSuccess(false);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: targetKey, param: inputVal })
      });
      const data = await res.json();
      const serverLogs = data.logs || ['[ERROR] Backend returned empty verification logs.'];

      for (let i = 0; i < serverLogs.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        setAuditLogs((prev) => [...prev, serverLogs[i]]);
      }

      if (data.success) {
        unlockKey(targetKey);
        setAuditSuccess(true);
      } else {
        setAuditSuccess(false);
      }
    } catch (err) {
      console.error('Error executing verification:', err);
      setAuditLogs(['[ERROR] Connection failure: WebGL compiler backend offline.']);
      setAuditSuccess(false);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full pt-16 bg-black">
      {/* LEFT COLUMN - WebGL 3D Particle Cloud */}
      <div className="relative h-[40vh] lg:h-[calc(100vh-4rem)] w-full p-4 lg:p-8 flex flex-col justify-center bg-slate-950/20 border-r border-slate-900">
        <ThreeCanvasStub color={color} />
        {/* Absolute coordinates legend */}
        <div className="absolute bottom-8 left-8 z-10 font-mono text-[10px] text-slate-500 flex flex-col">
          <span>PILLAR_TARGET: {targetKey}</span>
          <span>STABILIZATION: {isUnlocked ? 'SECURED (100%)' : 'SCRAMBLED (0%)'}</span>
        </div>
      </div>

      {/* RIGHT COLUMN - Technical Typography Matrix */}
      <div className="flex flex-col p-6 sm:p-12 overflow-y-auto h-auto lg:h-[calc(100vh-4rem)] gap-8 bg-slate-950/40">
        {/* Title & Desc */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">AEGIS PILLAR CONTROL</span>
          <h2 className="text-3xl font-mono font-bold tracking-tighter text-slate-100">{title}</h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>

        {/* Code Snippet Box */}
        <div className="flex flex-col rounded-lg border border-slate-900 bg-slate-950 overflow-hidden shadow-lg">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-900 bg-slate-900/40 font-mono text-[10px] text-slate-400 select-none">
            <Code className="w-3.5 h-3.5 text-cyan-500" />
            <span>REPOSITORY_SOURCE_DESTRUCTION_BYPASS</span>
          </div>
          <pre className="p-4 overflow-x-auto text-[11px] font-mono text-cyan-300/80 leading-normal select-all">
            <code>{codeSnippet}</code>
          </pre>
        </div>

        {/* Interactive Console Screen */}
        <div className="flex flex-col rounded-lg border border-slate-900 bg-slate-950 overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-900 bg-slate-900/40 font-mono text-[10px] text-slate-400 select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-500" />
              <span>INTERACTIVE COMPILER CONSOLE</span>
            </div>
            {isUnlocked && (
              <span className="text-green-400 font-bold">KEY_COMMITTED</span>
            )}
          </div>

          <div className="p-4 flex flex-col gap-4 font-mono text-xs">
            {/* Input Param (if custom input requested) */}
            {placeholderParam && !isUnlocked && (
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-semibold flex items-center gap-1">
                  <Settings className="w-3 h-3 text-cyan-500" />
                  <span>ENVIRONMENT CONSTANT PARAMETER:</span>
                </label>
                <input
                  type="text"
                  placeholder={placeholderParam}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {/* Action Trigger Button */}
            {!isUnlocked ? (
              <button
                onClick={handleAudit}
                disabled={isAuditing}
                className="w-full flex items-center justify-center gap-2 font-bold px-4 py-2.5 rounded bg-cyan-950/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-950/40 hover:border-cyan-400 transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{consoleActionLabel}</span>
              </button>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 font-bold px-4 py-2.5 rounded bg-green-950/20 text-green-400 border border-green-500/30">
                <Check className="w-3.5 h-3.5" />
                <span>SECRET DECRYPTED: {targetKey} UNLOCKED</span>
              </div>
            )}

            {/* Request Quote Button */}
            <button
              onClick={() => {
                const productNames: Record<string, string> = {
                  SALSETTE: 'Project Salsette (Spatial AI)',
                  SOLVER: 'ppf-contact-solver (Physics Core)',
                  NEXUS: 'NexusOrch (Agent Mesh)',
                  TOWER: 'AI Tower (Autonomous Habitat)'
                };
                setSelectedProduct(productNames[targetKey] || 'General Inquiry');
                setModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 font-mono font-bold text-xs px-4 py-2.5 rounded bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800/80 hover:text-white transition-all duration-200 cursor-pointer shadow-lg"
            >
              <span>REQUEST LICENSE QUOTE</span>
            </button>

            {/* Audit Log Box */}
            <AnimatePresence>
              {(isAuditing || auditLogs.length > 0 || isUnlocked) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-950 border border-slate-900 rounded p-3 h-44 overflow-y-auto flex flex-col gap-1.5 text-[11px] text-cyan-400/90 relative scanlines"
                >
                  {isUnlocked && auditLogs.length === 0 ? (
                    <div>[INFO] SOVEREIGN STABILIZER ONLINE. DECRYPTION KEY COMMIT COMPLETED.</div>
                  ) : (
                    auditLogs.map((log, idx) => {
                      const isSuccess = log.includes('SUCCESS') || log.includes('DECRYPTED');
                      const isError = log.includes('ERROR');
                      return (
                        <div
                          key={idx}
                          className={isSuccess ? 'text-green-400' : isError ? 'text-orange-400' : 'text-cyan-400/80'}
                        >
                          {log}
                        </div>
                      );
                    })
                  )}
                  {isAuditing && (
                    <div className="text-slate-600 animate-pulse">▋ AUDITING COMPILE STATE...</div>
                  )}
                  <div ref={terminalEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
