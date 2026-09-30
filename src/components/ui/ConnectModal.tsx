'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePuzzle } from '@/context/PuzzleContext';
import { X, Cpu, Server, Terminal, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConnectModal: React.FC = () => {
  const { isModalOpen, setModalOpen, selectedProduct } = usePuzzle();
  const [form, setForm] = useState({
    userIdentity: '',
    orgName: '',
    classification: 'Smart City/GovTech',
    description: '',
    product: 'General Inquiry'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [submitComplete, setSubmitComplete] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  useEffect(() => {
    if (isModalOpen) {
      setForm((prev) => ({
        ...prev,
        product: selectedProduct
      }));
    }
  }, [isModalOpen, selectedProduct]);

  if (!isModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const executeHandshake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userIdentity || !form.orgName) return;

    setIsSubmitting(true);
    setTerminalLogs([]);

    const initialSteps = [
      '⚡ INITIALIZING SOVEREIGN LAUNCH LINKUP PROTOCOL...',
      '📡 CONNECTING TO AEGIS EDGE SERVER NODE: SECURE_HOST_9090...',
      `🔑 PACKAGING IDENTITY SCROLLS FOR: ${form.userIdentity.toUpperCase()}@${form.orgName.toUpperCase()}`,
      `🌐 CATEGORY SCOPE DECLARED: ${form.classification.toUpperCase()}`,
      '🛡️ ENFORCING SEMANTIC COMPLIANCE POLICY CHECK (POL_2026)...'
    ];

    for (let i = 0; i < initialSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTerminalLogs((prev) => [...prev, initialSteps[i]]);
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (data.success) {
        const finalSteps = [
          '⚖️ VERIFYING BYZANTINE FAULT CONSENSUS ACROSS CLUSTERS...',
          `🔄 SUBMITTED RECORD WITH SECURE ID: ${data.submission.id}`,
          `📢 EMAIL ALERT ROUTING INITIATED...`,
          `✉️ EMAIL STATUS: ${data.transportLog}`,
          `🔬 ROTATING GENERATED CONNECTION HASH: ${data.hash}`,
          '🟢 HANDSHAKE ACKNOWLEDGED: STRATEGIC VENTURE COMMITTED SUCCESSFULLY!'
        ];

        for (let i = 0; i < finalSteps.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          setTerminalLogs((prev) => [...prev, finalSteps[i]]);
        }
        setSubmitComplete(true);
      } else {
        setTerminalLogs((prev) => [
          ...prev,
          `[ERROR] HANDSHAKE REJECTED BY SERVER: ${data.message || 'Unknown verification error'}`
        ]);
        setSubmitComplete(false);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setTerminalLogs((prev) => [
        ...prev,
        '[ERROR] CONNECTION ERROR: SERVER PORT GATEWAY OFFLINE.'
      ]);
      setSubmitComplete(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsSubmitting(false);
    setSubmitComplete(false);
    setTerminalLogs([]);
    setForm({
      userIdentity: '',
      orgName: '',
      classification: 'Smart City/GovTech',
      description: '',
      product: 'General Inquiry'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg overflow-hidden rounded-xl glass-panel border border-slate-800 bg-slate-950 p-6 shadow-2xl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2 font-mono font-bold text-sm text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>SECURE KEY EXCHANGE SCHEME</span>
          </div>
          <button onClick={closeModal} className="text-slate-500 hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitting ? (
            // 1. INPUT FORM MATRIX
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={executeHandshake}
              className="flex flex-col gap-4 font-mono text-xs"
            >
              <div className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                🛡️ Enter your credentials to finalize the cryptographic key linkup and gain priority queue access to the AxIyon deep-tech orchestration pipeline.
              </div>

              {/* User Identity */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-semibold">USER IDENTITY / PRINCIPAL NAME</label>
                <input
                  type="text"
                  name="userIdentity"
                  required
                  placeholder="e.g. Core Architect"
                  value={form.userIdentity}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Organization */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-semibold">ORGANIZATION / VENTURE ENTITY</label>
                <input
                  type="text"
                  name="orgName"
                  required
                  placeholder="e.g. AxIyon Research"
                  value={form.orgName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Classification */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-semibold">PROFESSIONAL CLASSIFICATION</label>
                <select
                  name="classification"
                  value={form.classification}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Smart City/GovTech">Smart City/GovTech</option>
                  <option value="Defense R&D">Defense R&D</option>
                  <option value="Enterprise BFSI">Enterprise BFSI</option>
                  <option value="Logistics/SaaS Operations">Logistics/SaaS Operations</option>
                </select>
              </div>

              {/* Product selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-semibold">INTERESTED PRODUCT SYSTEM BLOCK</label>
                <select
                  name="product"
                  value={form.product}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="NexusOrch (Agent Mesh)">NexusOrch (Agent Mesh)</option>
                  <option value="Project Salsette (Spatial AI)">Project Salsette (Spatial AI)</option>
                  <option value="ppf-contact-solver (Physics Core)">ppf-contact-solver (Physics Core)</option>
                  <option value="AI Tower (Autonomous Habitat)">AI Tower (Autonomous Habitat)</option>
                  <option value="KAOS Command (Tactical Command)">KAOS Command (Tactical Command)</option>
                  <option value="AxIyon Health (Consent Gateway)">AxIyon Health (Consent Gateway)</option>
                  <option value="Protofolio CMS (Luxury Credentials)">Protofolio CMS (Luxury Credentials)</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-semibold">INTENDED IMPLEMENTATION MODEL</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe your cross-project deployment requirements..."
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full flex items-center justify-center gap-2 font-bold px-4 py-2.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-950/70 hover:border-cyan-400 transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.2)]"
              >
                <Server className="w-4 h-4" />
                <span>EXECUTE CRYPTOGRAPHIC EXCH</span>
              </button>
            </motion.form>
          ) : (
            // 2. TERMINAL SCRIPT RUN LOOP
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 font-mono text-xs"
            >
              {/* Terminal screen container */}
              <div className="bg-slate-950 border border-slate-900 rounded p-4 h-64 overflow-y-auto flex flex-col gap-2 shadow-inner select-none relative scanlines">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[10px] text-red-500/60 font-semibold">
                  <Terminal className="w-3 h-3 animate-pulse" />
                  <span>STDOUT_OVERRIDE</span>
                </div>
                {terminalLogs.map((log, idx) => {
                  const isSuccess = log.includes('SUCCESS');
                  return (
                    <div
                      key={idx}
                      className={isSuccess ? 'text-green-400' : 'text-cyan-400/90'}
                    >
                      {log}
                    </div>
                  );
                })}
                {!submitComplete && (
                  <div className="text-slate-600 animate-pulse">▋ LOADING SECURE EXCH PIPELINE...</div>
                )}
                <div ref={terminalEndRef} />
              </div>

              {/* Completion notification */}
              {submitComplete && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col gap-3 p-4 rounded bg-green-950/20 border border-green-500/40 text-green-400 text-center"
                >
                  <div className="font-bold flex items-center justify-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    <span>LAUNCH PORTAL LINK SECURED</span>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    Entity successfully pre-registered for the Q3 2026 launch. Dynamic coordinate keys are committed to the municipal ledger.
                  </div>
                  <button
                    onClick={closeModal}
                    className="mt-1 px-4 py-2 border border-green-500/50 hover:bg-green-950/40 text-green-400 rounded cursor-pointer transition-colors"
                  >
                    CLOSE CONNECTION CONSOLE
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
