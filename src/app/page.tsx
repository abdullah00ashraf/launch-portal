'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePuzzle } from '@/context/PuzzleContext';
import { EncryptedClock } from '@/components/ui/EncryptedClock';
import { 
  Cpu, Globe, Database, Network, Key, ArrowRight, ShieldCheck, 
  HelpCircle, RefreshCw, RadioTower, Navigation, Info, ZoomIn, 
  ZoomOut, MapPin, Thermometer, Layers, Compass, Terminal, Shield, BookOpen, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Ported animations from DavidHDev/react-bits
import DecryptedText from '@/components/animations/DecryptedText';
import ClickSpark from '@/components/animations/ClickSpark';

export default function Home() {
  const { unlockedKeys, isFullyDecrypted, setModalOpen, setSelectedProduct } = usePuzzle();

  // Interactive Simulator States
  const [starFrequency, setStarFrequency] = useState<number>(432);
  const [compassAngle, setCompassAngle] = useState<number | null>(null);
  const [activePipelineNode, setActivePipelineNode] = useState<string>('INGEST');
  const [sosState, setSosState] = useState<'IDLE' | 'LOCATING' | 'BROADCASTING' | 'SECURED'>('IDLE');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '> System initialized. All local edge nodes reporting nominal.',
    '> Ingesting spatiotemporal NetCDF meteorology arrays...',
    '> Listening on bare-metal UDP multicast grid interfaces.'
  ]);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [starPulseActive, setStarPulseActive] = useState<boolean>(false);

  // Mouse Cursor Tracking States
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorLagPos, setCursorLagPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCursorLagPos({
        x: cursorLagPos.x + (mousePos.x - cursorLagPos.x) * 0.25,
        y: cursorLagPos.y + (mousePos.y - cursorLagPos.y) * 0.25
      });
    }, 16);
    return () => clearTimeout(interval);
  }, [mousePos, cursorLagPos]);

  // Telemetry Log Updater Helper
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 15)]);
  };

  // Action Triggers
  const triggerBackendSync = () => {
    setSyncing(true);
    addLog('Initiating full system synchronization with FastAPI backend...');
    setTimeout(() => {
      setSyncing(false);
      addLog('Synchronization completed. 216,284 coordinate grid nodes validated.');
    }, 1500);
  };

  const triggerStarPulse = () => {
    setStarPulseActive(true);
    addLog(`EMITTING ACOUSTIC PULSE: frequency=${starFrequency}Hz, compassAngle=${compassAngle !== null ? compassAngle : 'OMNI'}`);
    setTimeout(() => {
      setStarPulseActive(false);
      addLog(`STAR Pulse echo resolved. Sub-soil liquefaction delta verified: nominal.`);
    }, 1200);
  };

  const triggerSOSUplink = () => {
    setSosState('LOCATING');
    addLog('EMERGENCY SOS TRIGGERED. Initializing localized NavIC GPS coordinate lookup...');
    setTimeout(() => {
      setSosState('BROADCASTING');
      addLog('NavIC Lock Acquired. Resolving emergency routing matrix corridors...');
      setTimeout(() => {
        setSosState('SECURED');
        addLog('Uplink broadcast completed. Disaster routing dispatched to local municipal nodes.');
      }, 1500);
    }, 1200);
  };

  // Products Specifications Matrix
  const products = [
    {
      name: 'NexusOrch',
      category: 'Multi-Agent Graph Orchestration',
      tech: 'LangGraph, Python 3.12, SQLite',
      desc: 'Stateful workflow DAG engine executing specialized domain agents. Built with zero-SaaS telemetry logging, semantic policy guards, and deterministic loop arbitration.',
      path: '/agent-mesh',
      backSpecs: {
        'Engine Core': 'LangGraph Directed Acyclic Graph',
        'Telemetry Sink': 'SQLite zero-SaaS Local Log DB',
        'Compliance Layer': 'Adaptive Risk Matrix Gates',
        'State Retention': 'Polymorphic memory encryption'
      }
    },
    {
      name: 'Project Salsette / Sentinel V7',
      category: 'Hydrological Forecasting',
      tech: 'PyTorch PINN, Dask, NetCDF',
      desc: 'Spatiotemporal weather/tides grid fusion predictor utilizing a 10M-parameter Bi-LSTM model. Mathematically bound by Partial Differential Equations of fluid continuity.',
      path: '/spatial-ai',
      backSpecs: {
        'Loss Model': 'SentinelPhysics Continuity Constraints',
        'PDE Constraint': '∂H/∂t + ∂(uH)/∂x + ∂(vH)/∂y = 0',
        'Data Scale': '216,284 geographic grid cells',
        'Optimizer': 'AdamW + L2 Weight Regularization'
      }
    },
    {
      name: 'ppf-contact-solver',
      category: 'High-Performance Physics Core',
      tech: 'Rust, CUDA, PyO3, Maturin',
      desc: 'Ultra-fast numeric boundary collision engine compiling parallelized C++ CUDA kernels. Seamless PyO3 integration provides zero-copy numpy array pointer operations.',
      path: '/physics-core',
      backSpecs: {
        'Solver Core': 'Linear Bounding Volume Hierarchy',
        'Parallel Compute': 'NVIDIA CUDA Kernel Driver',
        'Python Wrapper': 'Maturin / PyO3 Dynamic Libraries',
        'Serialization': 'CBOR type-safe binary wire layout'
      }
    },
    {
      name: 'AI Tower (Aegis Core)',
      category: 'Autonomous Habitat Control Plane',
      tech: 'React Three Fiber, Node.js, WebSockets',
      desc: 'Real-time telemetry and robotics control plane for the 26-floor structural nervous system, relaying RPC commands to edge sub-agents.',
      path: '/tactical-edge',
      backSpecs: {
        'Frontend Canvas': 'React Three Fiber / WebGL',
        'Communication': 'Node.js WebSocket Hub (<25ms)',
        'Local AI Engine': 'Faster-Whisper & Ollama RAG',
        'Hardware Target': 'NVIDIA Jetson AGX Orin Redundant'
      }
    },
    {
      name: 'KAOS Command System',
      category: 'Low-Latency Sensor Command Center',
      tech: 'Python, Tkinter, PyAudio, PyInstaller',
      desc: 'Standalone Windows-native command client routing local audio voice inputs to edge sensors. Combines bare-metal UDP multicast grid receivers and security honeypots.',
      path: '/products',
      backSpecs: {
        'GUI substrate': 'Tkinter Core Architecture',
        'Multicast Routing': 'UDP bare-metal grid listener',
        'Build Tooling': 'PyInstaller spec parameters bundle',
        'Theorem Parsing': 'PyMuPDF academic documentation scraper'
      }
    },
    {
      name: 'AxIyon Consent Adapter',
      category: 'Healthcare Data Interoperability',
      tech: 'FHIR R4, Node.js, SQLite',
      desc: 'Consent-First clinical adapter mapping ABHA health records under strict DPDP compliance rules, utilizing a multi-factor patient deduplication engine.',
      path: '/products',
      backSpecs: {
        'API Standards': 'FHIR R4 / ABDM Gateway Specifications',
        'Legal Blueprint': 'DPDP compliance schema gates',
        'Deduplication': 'Three-factor patient hash matrices',
        'Sync Method': 'Zero-data retention sync caches'
      }
    },
    {
      name: 'Protofolio CMS',
      category: 'Luxury Credentials Manager',
      tech: 'Django, argon2, django-axes',
      desc: 'Hardened research publication repository and showcase platform featuring axes brute-force protection, Argon2 hashing, and database seed credentials cryptography.',
      path: '/products',
      backSpecs: {
        'Backend Admin': 'Hardened Django administration panel',
        'Access Security': 'django-axes rate-limiting logic',
        'Hashing Standard': 'Argon2-cffi high-entropy passwords',
        'Field Encryption': 'django-cryptography AES-256 database crypts'
      }
    }
  ];

  // Critical Risk Matrix Municipal Hubs
  const municipalHubs = [
    { name: 'Aminabad Sector D', risk: '98%', status: 'CRITICAL', class: 'text-red-500' },
    { name: 'Hazratganj Main Junction', risk: '89%', status: 'HIGH', class: 'text-amber-500' },
    { name: 'Gomti Barrage Lock 4', risk: '84%', status: 'HIGH', class: 'text-amber-500' },
    { name: 'Aliganj Drainage Line 2', risk: '76%', status: 'ELEVATED', class: 'text-yellow-400' },
    { name: 'Chowk Heritage Zone', risk: '63%', status: 'MODERATE', class: 'text-slate-400' },
    { name: 'Indira Nagar Gate', risk: '58%', status: 'MODERATE', class: 'text-slate-400' }
  ];

  // System Milestones Timeline
  const milestones = [
    { year: '2026-06', title: 'The Export Control Shock', desc: 'Department of Commerce unilaterally suspends Anthropic Fable/Mythos 5 models. Axiyon designs air-gapped model safety fallbacks.' },
    { year: '2026-04', title: 'Sovereign OS Release', desc: 'Phase-Zero LangGraph DAG and Rust Contact Solver modules launch on private edge envelopes.' },
    { year: '2025-11', title: 'Project Salsette Launch', desc: 'Hydrology PINN model deployed in Mumbai, ingesting 216k coordinate grid points.' }
  ];

  const handleGetQuote = (productName: string) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  return (
    <ClickSpark sparkColor="rgba(34, 211, 238, 0.5)" sparkRadius={30} sparkCount={10} easing="ease-out">
      <div className="relative min-h-[calc(100vh-4rem)] bg-dark text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-300 overflow-x-hidden p-6 sm:p-12 mb-24">
        
        {/* Custom Mouse Cursor elements */}
        <div 
          id="custom-cursor" 
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} 
          className="pointer-events-none fixed z-[9999] w-1.5 h-1.5 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400/50"
        />
        <div 
          id="custom-cursor-ring" 
          style={{ left: `${cursorLagPos.x}px`, top: `${cursorLagPos.y}px` }} 
          className="pointer-events-none fixed z-[9998] w-7 h-7 border border-cyan-400/40 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        />

        {/* Embedded CSS for 3D Flipping Cards & Scanlines */}
        <style dangerouslySetInnerHTML={{__html: `
          .crt-overlay {
            position: fixed;
            inset: 0;
            z-index: 5;
            pointer-events: none;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 4px, 6px 100%;
            opacity: 0.15;
          }
          .flip-card {
            perspective: 1200px;
          }
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
          }
          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          .flip-card-back {
            transform: rotateY(180deg);
          }
        `}} />

        {/* CRT Scanline Filter layer overlay */}
        <div className="crt-overlay" />

        {/* Master Content Frame */}
        <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">

          {/* 1. HERO & COCKPIT BOARD (Split Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-6">
            
            {/* Editorial Headline block */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-3xl border border-white/5 bg-neutral-950/20 backdrop-blur-md">
              <div>
                <span className="font-mono text-[9px] font-bold tracking-[3px] text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 uppercase inline-block mb-6 cursor-help">
                  <DecryptedText text="AxIyon // SOVEREIGN DEEP-TECH CORE" animateOn="hover" speed={40} />
                </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none font-grotesk uppercase">
                  <DecryptedText text="Sovereign" animateOn="view" speed={60} className="text-white" /> <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                    <DecryptedText text="Industrial OS" animateOn="view" speed={80} delay={0.2} />
                  </span>
                </h1>
                <p className="font-serif italic font-light text-lg sm:text-2xl text-slate-400 mt-6 leading-relaxed">
                  Zero-SaaS, local mathematical kernels, and physics-constrained neural matrix networks engineered for absolute data confidentiality.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-8 font-mono text-[10px]">
                <Link 
                  href="/products"
                  className="px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-bold hover:bg-cyan-950/40 hover:border-cyan-400 transition-all duration-200 uppercase tracking-wider"
                >
                  Explore Software Blocks
                </Link>
                <button 
                  onClick={() => handleGetQuote('Sovereign OS General Inquiry')}
                  className="px-6 py-3 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 font-bold hover:bg-neutral-850 hover:text-white transition-all duration-200 uppercase tracking-wider cursor-pointer"
                >
                  Link Secure Node
                </button>
              </div>
            </div>

            {/* Interactive State & Telemetry Simulator */}
            <div className="lg:col-span-5 glass-panel border border-cyan-500/10 p-6 rounded-3xl flex flex-col justify-between bg-dark-card/60 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></span>
                  <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
                    <DecryptedText text="Telemetry Console" animateOn="hover" speed={30} />
                  </span>
                </div>
                <button 
                  onClick={triggerBackendSync}
                  className={`text-slate-500 hover:text-cyan-400 transition-colors p-1 ${syncing ? 'animate-spin' : ''}`}
                  title="Sync with local Edge backend"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive SVG Node Graph */}
              <div className="my-6 py-4 flex items-center justify-center bg-black/40 rounded-xl border border-white/5 relative h-36">
                <svg width="300" height="120" viewBox="0 0 300 120" className="select-none font-mono">
                  {/* Connection lines */}
                  <line x1="60" y1="60" x2="150" y2="60" stroke={activePipelineNode === 'RAG' ? '#00f2fe' : '#1e293b'} strokeWidth="1.5" className="transition-colors duration-300" />
                  <line x1="150" y1="60" x2="240" y2="60" stroke={activePipelineNode === 'CUDA' ? '#00f2fe' : '#1e293b'} strokeWidth="1.5" className="transition-colors duration-300" />
                  
                  {/* Node 1: Ingest */}
                  <circle 
                    cx="60" cy="60" r="14" 
                    fill={activePipelineNode === 'INGEST' ? 'rgba(0,242,254,0.1)' : '#070a13'} 
                    stroke={activePipelineNode === 'INGEST' ? '#00f2fe' : '#334155'} 
                    strokeWidth="2" 
                    className="cursor-pointer transition-all duration-300 hover:r-16"
                    onClick={() => { setActivePipelineNode('INGEST'); addLog('Pipeline node select: INGEST (01_init_mumbai_grid.py)'); }}
                  />
                  <text x="60" y="63" fontSize="8" textAnchor="middle" fill="#94a3b8" fontWeight="bold" className="pointer-events-none">IN</text>
                  
                  {/* Node 2: RAG */}
                  <circle 
                    cx="150" cy="60" r="14" 
                    fill={activePipelineNode === 'RAG' ? 'rgba(0,242,254,0.1)' : '#070a13'} 
                    stroke={activePipelineNode === 'RAG' ? '#00f2fe' : '#334155'} 
                    strokeWidth="2" 
                    className="cursor-pointer transition-all duration-300 hover:r-16"
                    onClick={() => { setActivePipelineNode('RAG'); addLog('Pipeline node select: RAG (ChromaDB embeddings registry)'); }}
                  />
                  <text x="150" y="63" fontSize="8" textAnchor="middle" fill="#94a3b8" fontWeight="bold" className="pointer-events-none">RAG</text>
                  
                  {/* Node 3: CUDA Solver */}
                  <circle 
                    cx="240" cy="60" r="14" 
                    fill={activePipelineNode === 'CUDA' ? 'rgba(0,242,254,0.1)' : '#070a13'} 
                    stroke={activePipelineNode === 'CUDA' ? '#00f2fe' : '#334155'} 
                    strokeWidth="2" 
                    className="cursor-pointer transition-all duration-300 hover:r-16"
                    onClick={() => { setActivePipelineNode('CUDA'); addLog('Pipeline node select: CUDA (Contact solver core engine)'); }}
                  />
                  <text x="240" y="63" fontSize="8" textAnchor="middle" fill="#94a3b8" fontWeight="bold" className="pointer-events-none">CUDA</text>

                  <text x="150" y="110" fontSize="8" textAnchor="middle" fill="#64748b" className="uppercase font-semibold">Active: {activePipelineNode}</text>
                </svg>
              </div>

              {/* Micro logs trace box */}
              <div className="bg-black/50 border border-white/5 rounded-xl p-3 font-mono text-[9px] text-slate-500 h-28 overflow-y-auto space-y-1 scrollbar-none flex flex-col-reverse">
                {terminalLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>

          </div>

          {/* 2. OPERATIONAL SIMULATORS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* STAR Resonance Emitter */}
            <div className="md:col-span-7 glass-panel p-6 rounded-3xl flex flex-col justify-between gap-6 border border-white/5 bg-neutral-950/20">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] text-cyan-400 font-mono tracking-widest flex items-center gap-2 uppercase font-bold">
                    <BookOpen className="w-4 h-4 text-cyan-400" /> STAR: Acoustic Resonance Emitter
                  </span>
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono text-cyan-400 border border-cyan-500/20 bg-cyan-950/25">ACTIVE</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Adjust the Sub-Terranean Acoustic Resonance frequency parameters to map structural subsoil liquefaction zones and hydraulic chokepoints.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <div className="flex-1 w-full">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2 font-semibold">
                      <span>EMISSION FREQUENCY</span>
                      <span className="text-cyan-400 font-bold">{starFrequency} Hz</span>
                    </div>
                    <input 
                      type="range" min="10" max="1000" value={starFrequency} 
                      onChange={(e) => setStarFrequency(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-slate-600 mt-1">
                      <span>10 Hz (Surface Runoff)</span>
                      <span>1000 Hz (Deep Liquefaction)</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={triggerStarPulse}
                    disabled={starPulseActive}
                    className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-xl text-[10px] font-bold font-mono tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5" /> Emit Pulse
                  </button>
                </div>
              </div>

              {/* Compass Array selector */}
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Compass Angle Filter:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {[0, 90, 180, 270].map(angle => (
                    <button 
                      key={angle}
                      onClick={() => { setCompassAngle(angle); addLog(`Compass boundary filter set: ${angle}°`); }}
                      className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] font-bold transition-all cursor-pointer ${
                        compassAngle === angle 
                          ? 'border-cyan-400 bg-cyan-950/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]' 
                          : 'border-white/5 bg-neutral-900 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      {angle}° {angle === 0 ? 'N' : angle === 90 ? 'E' : angle === 180 ? 'S' : 'W'}
                    </button>
                  ))}
                  <button 
                    onClick={() => { setCompassAngle(null); addLog('Compass boundary filter cleared (OMNI direction)'); }}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] font-bold transition-all cursor-pointer ${
                      compassAngle === null 
                        ? 'border-cyan-400 bg-cyan-950/20 text-cyan-400' 
                        : 'border-white/5 bg-neutral-900 text-slate-400'
                    }`}
                  >
                    OMNI
                  </button>
                </div>
              </div>
            </div>

            {/* SOS Broadcast & Critical Risk Hubs */}
            <div className="md:col-span-5 glass-panel p-6 rounded-3xl border border-white/5 bg-neutral-950/20 flex flex-col justify-between gap-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] text-red-400 font-mono tracking-widest flex items-center gap-2 uppercase font-bold">
                    <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" /> Emergency Uplink Protocol
                  </span>
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono text-red-500 border border-red-500/20 bg-red-950/25">SECURE</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Activate the Emergency SOS manual override to broadcast critical evacuations and hydraulic lock closures.
                </p>
                
                <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <div className="flex flex-col gap-1 font-mono text-[10px]">
                    <span className="text-slate-400 uppercase">Gateway State</span>
                    <span className="text-red-400 font-bold uppercase">{sosState}</span>
                  </div>
                  
                  <button 
                    onClick={triggerSOSUplink}
                    disabled={sosState !== 'IDLE'}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-[10px] tracking-widest px-6 py-2.5 rounded-xl uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] disabled:opacity-50 cursor-pointer"
                  >
                    {sosState === 'IDLE' ? 'Activate SOS' : 'Broadcasting'}
                  </button>
                </div>
              </div>

              {/* Risk Index hub lists */}
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-3 block font-semibold">Active Critical Hubs:</span>
                <div className="max-h-[120px] overflow-y-auto space-y-2 pr-1 scrollbar-none">
                  {municipalHubs.map((hub, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-1">
                      <span className="text-slate-400">{hub.name}</span>
                      <div className="flex items-center gap-3">
                        <span className={`${hub.class} font-bold`}>{hub.risk}</span>
                        <span className="text-[8px] bg-neutral-900 border border-white/5 px-1.5 py-0.5 rounded text-slate-400">{hub.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 3. Cryptographic Verification Deck */}
          <div className="flex flex-col gap-4 w-full py-6">
            <div className="font-mono text-[10px] text-slate-500 border-b border-neutral-900 pb-2 uppercase font-semibold tracking-[2px] flex justify-between">
              <span>Cryptographic Verification Gate</span>
              <span>Unlocks: {unlockedKeys.length}/4</span>
            </div>
            <EncryptedClock />
          </div>

          {/* 4. 3D SPECS-FLIP PRODUCT CATALOG */}
          <div className="flex flex-col gap-6 w-full py-6">
            <div className="flex justify-between items-center font-mono text-[10px] text-slate-500 border-b border-neutral-900 pb-2">
              <span className="font-semibold uppercase tracking-[2px]">Sovereign Software Blocks Catalog</span>
              <span>7 ACTIVE SYSTEM PILLARS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod, idx) => (
                <div key={idx} className="flip-card min-h-[340px] w-full relative">
                  <div className="flip-card-inner relative w-full h-full">
                    
                    {/* Card Front */}
                    <div className="flip-card-front p-6 rounded-2xl glass-panel border border-white/5 bg-neutral-950/20 backdrop-blur-md flex flex-col justify-between">
                      <div className="flex flex-col gap-4">
                        <span className="text-[9px] text-cyan-400 font-mono font-bold tracking-wider uppercase border-b border-white/5 pb-2">{prod.category}</span>
                        <h3 className="text-xl font-bold font-grotesk text-white uppercase">{prod.name}</h3>
                        <span className="text-[9px] font-mono bg-neutral-900 border border-white/5 text-slate-400 px-2 py-0.5 rounded w-max">{prod.tech}</span>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2">{prod.desc}</p>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5 font-mono text-[9px] text-slate-500">
                        <button 
                          onClick={() => handleGetQuote(prod.name)}
                          className="px-4 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/20 hover:border-cyan-400 transition-colors font-bold cursor-pointer uppercase tracking-wider"
                        >
                          Request Quote
                        </button>
                        <span className="text-slate-500 select-none">Hover to flip</span>
                      </div>
                    </div>

                    {/* Card Back */}
                    <div className="flip-card-back p-6 rounded-2xl border border-cyan-500/30 bg-neutral-950 flex flex-col justify-between shadow-2xl">
                      <div>
                        <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-4">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{prod.name} Specifications</span>
                          <Shield className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <div className="space-y-3 font-mono text-[10px]">
                          {Object.entries(prod.backSpecs).map(([key, val]) => (
                            <div key={key} className="flex flex-col gap-1 pb-2 border-b border-white/5">
                              <span className="text-slate-500 uppercase tracking-widest text-[8px]">{key}</span>
                              <span className="text-slate-300 font-semibold">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Link 
                        href={prod.path}
                        className="w-full text-center py-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 hover:bg-cyan-950/40 text-cyan-400 font-mono font-bold text-[9px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Access Console</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. SYSTEM CHRONOLOGY MILESTONES */}
          <div className="flex flex-col gap-8 w-full py-6">
            <div className="font-mono text-[10px] text-slate-500 border-b border-neutral-900 pb-2 uppercase font-semibold tracking-[2px]">
              System Evolution Milestones
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[10px]">
              {milestones.map((m, i) => (
                <div key={i} className="p-5 rounded-xl border border-white/5 bg-neutral-950/15 flex flex-col gap-2 relative">
                  <span className="text-cyan-400 font-bold text-[11px]">{m.year}</span>
                  <span className="text-white font-bold uppercase tracking-wider text-xs font-grotesk">{m.title}</span>
                  <p className="text-slate-500 text-xs mt-1 leading-normal font-sans">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </ClickSpark>
  );
}
