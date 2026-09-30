'use client';

import React from 'react';
import { Shield, ShieldCheck, Cpu, Database, User, Globe, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import DecryptedText from '@/components/animations/DecryptedText';
import ClickSpark from '@/components/animations/ClickSpark';

export default function AboutUs() {
  const valueMoats = [
    {
      title: 'Mathematical Rigor',
      desc: 'High-performance solvers compiling native Rust schemas with parallelized CUDA kernels to bypass legacy CAD/CAE limitations.',
      icon: Database,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/10'
    },
    {
      title: 'Geo-Spatial Forensics',
      desc: 'Hyper-local 100x100m grid cell resolution mapping and hydro-meteorological flood vector forecasts, validated via local PINNs.',
      icon: Globe,
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/10'
    },
    {
      title: 'Agentic Governance',
      desc: 'LangGraph multi-agent orchestration pipelines executing complex corporate workflows protected by strict risk-arbitration loops.',
      icon: Network,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-950/10'
    },
    {
      title: 'Tactical Edge Control',
      desc: 'Air-gapped voice engines (Whisper/Piper) and Three.js 3D dashboards displaying low-latency building telemetry without cloud leakages.',
      icon: Cpu,
      color: 'text-amber-400 border-amber-500/20 bg-amber-950/10'
    }
  ];

  return (
    <ClickSpark sparkColor="rgba(34, 211, 238, 0.5)" sparkRadius={30} sparkCount={10} easing="ease-out">
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] p-6 sm:p-12 gap-12 max-w-5xl mx-auto">
        {/* 1. HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mt-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs font-bold tracking-widest text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/10 uppercase cursor-help"
          >
            <DecryptedText text="Corporate Profile" animateOn="hover" speed={40} />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl sm:text-5xl font-mono font-bold tracking-tighter text-slate-100 leading-none"
          >
            <DecryptedText text="AXIYON INTELLIGENCE" animateOn="view" speed={50} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs sm:text-sm text-cyan-500 max-w-xl uppercase tracking-wider font-semibold"
          >
            Sovereign Deep-Tech & Industrial Intelligence Suite
          </motion.p>
        </div>

        {/* 2. CORPORATE CORE DESCRIPTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Core Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 p-6 rounded-xl glass-panel border border-slate-800/80 hover:border-slate-700/80 flex flex-col gap-4 font-mono"
          >
            <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
              <Shield className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-200 uppercase">
                <DecryptedText text="Sovereign Strategic Vision" animateOn="hover" speed={30} />
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AxIyon develops the <strong>Sovereign Industrial OS</strong>. Operating in high-security, low-latency, and high-concurrency environments, AxIyon provides air-gapped, zero-SaaS, and zero-data-leakage enterprise deployments tailored for Indian public sector undertakings (PSUs), heavy manufacturing conglomerates, and municipal corporations.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              By avoiding third-party APIs and foreign cloud dependencies, we guarantee that vital geological, structural, and financial datasets remain safe within government-controlled networks, establishing an unshakeable technological moat.
            </p>
          </motion.div>

          {/* Leadership Profile (Generic - No credentials disclosed) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl glass-panel border border-slate-800/80 hover:border-slate-700/80 flex flex-col gap-4 font-mono"
          >
            <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
              <User className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-200 uppercase">Principal Architecture</h3>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-100">Sovereign Lead Architect</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Edge Systems & Core Kernels</span>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                A decentralized engineering group bridging spatiotemporal hydrology neural networks, parallel physics collision solvers, and LangGraph multi-agent execution rules.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3. BENTO GRID OF PILLARS */}
        <div className="flex flex-col gap-4 w-full">
          <div className="font-mono text-xs text-slate-500 border-b border-slate-900 pb-2 uppercase font-semibold">
            Technological Pillars & IP Moats
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valueMoats.map((moat, idx) => {
              const Icon = moat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.3 }}
                  className="p-6 rounded-xl glass-panel border border-slate-800/80 hover:border-slate-700/80 flex gap-4 transition-all duration-300"
                >
                  <div className={`p-3 rounded-lg border h-11 w-11 flex items-center justify-center shrink-0 ${moat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-tight">{moat.title}</span>
                    <span className="text-[11px] text-slate-400 leading-relaxed">{moat.desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full text-center font-mono text-[10px] text-slate-600 border-t border-slate-900 pt-6"
        >
          <span>AXIYON INTELLIGENCE © 2026 // SOVEREIGN INDUSTRIAL HOLDINGS</span>
        </motion.div>
      </div>
    </ClickSpark>
  );
}
