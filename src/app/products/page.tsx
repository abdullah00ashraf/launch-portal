'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cpu, Globe, Database, Network, Server, Key, Landmark, HeartPulse, FolderGit, Activity, AlertTriangle, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePuzzle } from '@/context/PuzzleContext';
import DecryptedText from '@/components/animations/DecryptedText';
import ClickSpark from '@/components/animations/ClickSpark';

export default function ProductsShowcase() {
  const { setSelectedProduct, setModalOpen } = usePuzzle();
  const [activeTab, setActiveTab] = useState<'nexus' | 'salsette' | 'solver' | 'aegis' | 'kaos' | 'health' | 'protofolio'>('nexus');

  // Sliders interactive state
  const [nexusThreshold, setNexusThreshold] = useState(0.35);
  const [salsetteRain, setSalsetteRain] = useState(45);
  const [solverStress, setSolverStress] = useState(0.05);
  const [aegisHeight, setAegisHeight] = useState(1.0);
  const [kaosConfidence, setKaosConfidence] = useState(0.85);
  const [healthWindow, setHealthWindow] = useState(300);
  const [protofolioLimit, setProtofolioLimit] = useState(30);

  const products = {
    nexus: {
      name: 'NexusOrch',
      subtitle: 'Enterprise Multi-Agent Graph Orchestration',
      icon: Network,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-950/10',
      tagline: 'Complex workflow DAG routing secured by compliance-priority arbitration loops and local client execution.',
      overview: 'NexusOrch coordinates specialized agent nodes (Orchestrator, Finance, Resource, DevOps, Comms) through LangGraph directed acyclic execution graphs. It resolves plan conflicts using an autonomous Arbitrator Node (priority: compliance > hard_cap > soft_preference) and logs execution traces inside a zero-SaaS, local OpenTelemetry SQLite database.',
      techStack: ['Python 3.12', 'LangGraph', 'LangChain-Core', 'MCP Host', 'SQLite', 'Local OTEL'],
      dependencies: ['langgraph', 'langchain-core', 'pydantic', 'mcp', 'pandas'],
      deployment: 'Private Cloud Appliance / Local Server Cluster Container',
      marketMetrics: [
        { label: 'India Enterprise SaaS Market', value: '₹2.41 Lakh Crores' },
        { label: 'Average Automated Operations SLA', value: '< 200ms' }
      ],
      gtmPitch: [
        'Automates complex cross-departmental operations (e.g. aligning logistics dispatch with Finance audits) without cloud dependencies.',
        'Prevents recursive agent costs and infinite execution loops using built-in graph circuit-breakers.',
        'Enforces secure local telemetry logging, ensuring corporate financial records never leak.'
      ]
    },
    salsette: {
      name: 'Project Salsette / Sentinel V7',
      subtitle: 'Coastal Defense & Urban Hydrological Forecasting Spatial AI',
      icon: Globe,
      color: 'text-cyan-400 border-cyan-500/20 bg-cyan-950/10',
      tagline: 'Hyper-local 100x100m grid cell waterlogging projections up to 48 hours in advance.',
      overview: 'Project Salsette ingests and fuses spatial datasets (topography slopes, weather matrices, tidal records) over the Greater Mumbai region (216,284 grids). Fusing NetCDF arrays with pyarrow columnar streams, it runs Physics-Informed Neural Network (PINN) inferences to forecast anomalies, audited by a local LLM supervisor checking neural weights for structural compliance.',
      techStack: ['Python', 'FastAPI', 'Redis', 'PyTorch', 'PyArrow', 'Xarray'],
      dependencies: ['fastapi', 'torch', 'redis', 'pyarrow', 'xarray', 'cryptography'],
      deployment: 'Air-Gapped Ward-Level Server Appliance / Municipal On-Premises Core',
      marketMetrics: [
        { label: 'Indian Smart Water Infrastructure', value: '₹1.80 Lakh Crores' },
        { label: 'Non-Life GWP Claims Exposure', value: '₹3.36 Lakh Crores' }
      ],
      gtmPitch: [
        'Fuses GIS topography, Open-Meteo precipitation streams, and tides to predict urban waterlogging 48 hours early.',
        'Audited by the AEGIS Judge running 6 validation suites (including the S5 Historian curve tracking the July 26, 2005 flood).',
        'Secure Neural Ignition decrypts weights directly into RAM, immediately wiping the key via virtual memory locks (mlock).'
      ]
    },
    solver: {
      name: 'ppf-contact-solver',
      subtitle: 'High-Performance Physics Simulation Core',
      icon: Database,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/10',
      tagline: 'GPU-parallelized multi-body mechanical mesh collision solvers.',
      overview: 'The ppf-contact-solver is a dual-language numerical simulation kernel. It maps pure Rust geometrical structures (nalgebra) to high-speed parallelized C++ CUDA kernels (LBVH, ACCD collision checks, radix sorts). Using Maturin and PyO3, it binds direct memory structures to Python wrappers with zero-copy overhead, calculating stress deformation grids in milliseconds.',
      techStack: ['Rust', 'C++ (CUDA)', 'Python', 'PyO3', 'Maturin', 'nalgebra'],
      dependencies: ['cuda-toolkit', 'cc-crate', 'pyo3', 'maturin', 'tokio'],
      deployment: 'Proprietary SDK / seat-based developer library integrations',
      marketMetrics: [
        { label: 'R&D Prototyping Cost Reduction', value: 'Up to 40%' },
        { label: 'Collision Loop Resolution Latency', value: '< 1ms' }
      ],
      gtmPitch: [
        'Accelerates complex engineering design loops for aerospace, drone, and automotive structural stress checks.',
        'Bypasses legacy cloud simulation suites, executing parallel mesh collision logic on local NVidia workstations.',
        'CBOR wire format compatibility facilitates connections to Blender add-ons and Python notebooks.'
      ]
    },
    aegis: {
      name: 'AI Tower (Aegis Core)',
      subtitle: 'Autonomous 26-Floor Habitat Control Plane',
      icon: Radio,
      color: 'text-sky-400 border-sky-500/20 bg-sky-950/10',
      tagline: 'Three-tiered neural control plane (LSTM Data Harmonizer -> PINN Safety -> Central Agentic AI).',
      overview: 'The Aegis Tower Core consolidates building load parameters, seismological strain waves, bioclimatic exterior louvers, and tri-generation energy into a single unhackable control plane. It processes time-series feeds in sub-milliseconds, deploying micro-drone swarms and facade KUKA arms autonomously to prevent physical failures.',
      techStack: ['React', 'Three.js', 'fastapi', 'uvicorn', 'PyTorch', 'PyArrow'],
      dependencies: ['three', '@react-three/fiber', '@react-three/drei', 'fastapi', 'torch', 'uvicorn'],
      deployment: 'On-Premise Industrial Server Rack / Air-Gapped Compute Node',
      marketMetrics: [
        { label: 'Structural Autonomous Decision Latency', value: '< 0.5ms' },
        { label: 'Pre-Incident Threat Simulation', value: '10M synthetic scenarios' }
      ],
      gtmPitch: [
        'Fully replaces human operations latency in fire containment, seismic shock response, and grid isolation.',
        'Integrates biological concrete load sensors directly with structural Physics-Informed Neural Networks.',
        'Air-gapped tri-generation microgrids guarantee total operational independence during municipal blackouts.'
      ]
    },
    kaos: {
      name: 'KAOS Command System',
      subtitle: 'Tactical Voice & Sensor Edge Control Center',
      icon: Cpu,
      color: 'text-amber-400 border-amber-500/20 bg-amber-950/10',
      tagline: 'Multi-threaded operator sign-challenge command hub with hardware purge locks.',
      overview: 'KAOS CommandCenter v3.1 bridges multi-sensor networks (radar, sonar) with voice command transcription. Running a local Whisper parser, it routes verbal cues (alarm, strobe, dim screen) into 16 keyword routines compiled as LLVM IR unikernels, backed by automated honeypots that sever uplinks immediately upon breach detection.',
      techStack: ['Python 3.11', 'Tkinter', 'SpeechRecognition', 'pyaudio', 'LLVM compilers'],
      dependencies: ['speechrecognition', 'pyaudio', 'pyinstaller', 'numpy', 'scikit-learn'],
      deployment: 'Tactical Command Edge Appliance / Standalone Security Desktop venv',
      marketMetrics: [
        { label: 'Speech-to-Actuator Routing Latency', value: '< 24ms' },
        { label: 'Keyword Pre-defined Routines', value: '16 core actions' }
      ],
      gtmPitch: [
        'Decouples building/vehicle controls from public networks, using local speech recognition offline.',
        'Includes operator sign-challenge challenge-response tokens to prevent spoofing inputs.',
        'Instantly severs physical uplinks and runs black-purges via hyper-threaded honey-pot effectors.'
      ]
    },
    health: {
      name: 'AxIyon Health Consent Adapter',
      subtitle: 'Healthcare Data Interoperability & Consent Gateway',
      icon: HeartPulse,
      color: 'text-rose-400 border-rose-500/20 bg-rose-950/10',
      tagline: 'ABDM clinical data mapping secured by three-factor deduplication.',
      overview: 'AxIyon Health Consent Adapter bridges the integration gap between India’s 900M ABHA profiles and active network usage. Operating under DPDP guidelines, it standardizes records (FHIR R4) across ABDM, Android Health Connect, and Apple HealthKit, resolving data duplications on federated networks using strict time/value tolerance matching equations.',
      techStack: ['TypeScript', 'React', 'Next.js', 'Health Connect', 'FHIR Profiles'],
      dependencies: ['next', 'react', 'tailwindcss', '@tailwindcss/postcss', 'lucide-react'],
      deployment: 'Clinical API Adapter / Healthcare Platform Middleware Integration',
      marketMetrics: [
        { label: 'India Digital Health Market Size', value: '$22.70 Billion' },
        { label: 'Ecosystem Registry Coverage Gap', value: '90.5% Offline' }
      ],
      gtmPitch: [
        'Enforces granular, revocable patient consent schemas aligned with the DPDP rules timeline.',
        'Fuses disparate medical data sources with a 3-factor clinical matching formula (ABHA + MetricType + 5-min threshold).',
        'Implements hardened local database encryption to protect patient registries from ransomware targets.'
      ]
    },
    protofolio: {
      name: 'Protofolio CMS',
      subtitle: 'Luxury Credentials & Research Content Manager',
      icon: FolderGit,
      color: 'text-violet-400 border-violet-500/20 bg-violet-950/10',
      tagline: 'Hardened research publication repository and showcase CMS.',
      overview: 'Protofolio CMS provides a luxury academic credentials database and publication manager. Pre-seeded with profile data, it features rate-limiting via django-axes, database cryptography, and a rich, glassmorphic client frontend to render publication timelines, research indices, and dynamic chronograph maps.',
      techStack: ['Python', 'Django', 'SQLite', 'React', 'Three.js', 'Framer Motion'],
      dependencies: ['django', 'django-axes', 'django-cryptography', 'argon2-cffi', 'whitenoise'],
      deployment: 'Proprietary B2B Portfolio Appliance / Academic Content Gateway',
      marketMetrics: [
        { label: 'Publication Indexing Sync Delay', value: 'Zero Latency' },
        { label: 'Security Rate-Limit Gating', value: 'Active (django-axes)' }
      ],
      gtmPitch: [
        'Provides a highly secure, rate-limited content manager to showcase credentials and research archives.',
        'Features glassmorphic portfolio interfaces driven by custom Three.js WebGL particle clouds.',
        'Decoupled architecture makes it easy to integrate with custom institutional database providers.'
      ]
    }
  };

  const activeProduct = products[activeTab];
  const ActiveIcon = activeProduct.icon;

  const triggerQuote = (productName: string) => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  // Live simulation calculations
  const getNexusStats = () => {
    const autoApprove = Math.round((1 - nexusThreshold) * 100);
    const batchReview = Math.round(nexusThreshold * 75);
    const haltState = nexusThreshold > 0.8 ? 'HALT TRIGGERED' : 'SAFE CAP';
    return { autoApprove, batchReview, haltState };
  };

  const getSalsetteStats = () => {
    const grids = Math.round(salsetteRain * 123.4);
    const runTime = (salsetteRain * 0.12).toFixed(2);
    const severity = salsetteRain > 90 ? 'CRITICAL SHIELD ENGAGED' : 'NORMAL';
    return { grids, runTime, severity };
  };

  const getSolverStats = () => {
    const isCritical = solverStress > 0.1;
    const computeTime = (0.24 + solverStress * 3.5).toFixed(2);
    return { isCritical, computeTime };
  };

  const getAegisStats = () => {
    const twist = Math.round(45 * aegisHeight);
    const load = (24000 * aegisHeight).toFixed(0);
    return { twist, load };
  };

  const getKaosStats = () => {
    const isMismatched = kaosConfidence < 0.6;
    const voiceConfidence = Math.round(kaosConfidence * 100);
    return { isMismatched, voiceConfidence };
  };

  const getHealthStats = () => {
    const matchProb = Math.min(99, Math.round(100 - (healthWindow / 20)));
    const status = healthWindow > 400 ? 'EXPIRED' : 'ACTIVE';
    return { matchProb, status };
  };

  const getProtofolioStats = () => {
    const isLocked = protofolioLimit < 15;
    const health = isLocked ? 'BRUTE-FORCE LOCKOUT' : 'SECURE';
    return { isLocked, health };
  };

  return (
    <ClickSpark sparkColor="rgba(245, 158, 11, 0.4)" sparkRadius={30} sparkCount={10} easing="ease-out">
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] p-6 sm:p-12 gap-16 max-w-5xl mx-auto mb-24">
        {/* 1. HEADER */}
        <div className="flex flex-col items-center text-center gap-4 mt-6">
          <span className="font-mono text-[10px] font-bold tracking-widest text-amber-500 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-950/10 uppercase cursor-help">
            <DecryptedText text="AxIyon Intellectual Property" animateOn="hover" speed={40} />
          </span>
          <h1 className="text-4xl sm:text-6xl font-editorial font-bold tracking-tight text-neutral-100 italic">
            <DecryptedText text="Sovereign Software Blocks" animateOn="view" speed={50} />
          </h1>
        <p className="font-mono text-[11px] text-neutral-400 max-w-xl leading-relaxed mt-2">
          AxIyon constructs zero-data-leakage, high-performance software modules designed to operate locally on private clusters. Select a product block to inspect dynamic telemetry.
        </p>
      </div>

      {/* 2. TABS SELECTOR (7 Products) */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-neutral-900 pb-4 w-full">
        {(Object.keys(products) as Array<keyof typeof products>).map((tab) => {
          const prod = products[tab];
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-mono text-[10px] font-bold rounded-lg border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-amber-500/40 text-amber-400 bg-amber-950/10 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                  : 'border-neutral-900 text-neutral-500 hover:border-neutral-800 hover:text-neutral-300'
              }`}
            >
              {prod.name}
            </button>
          );
        })}
      </div>

      {/* 3. ACTIVE PRODUCT VIEW */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            {/* LEFT COLUMN: Overview, Tech, Dependencies, Telemetry and Visuals */}
            <div className="md:col-span-2 flex flex-col gap-8">
              {/* Product Info Block */}
              <div className="p-8 rounded-2xl glass-panel border border-neutral-900 flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <div className={`p-3 rounded-lg border ${activeProduct.color}`}>
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-editorial font-bold text-neutral-100 italic">{activeProduct.name}</h2>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">{activeProduct.subtitle}</span>
                  </div>
                </div>
                <span className="font-mono text-xs text-amber-400 font-bold border-l border-amber-500/40 pl-4 leading-relaxed mt-2">
                  {activeProduct.tagline}
                </span>
                <p className="font-mono text-[11px] text-neutral-400 leading-relaxed mt-1">
                  {activeProduct.overview}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="p-8 rounded-2xl glass-panel border border-neutral-900 flex flex-col gap-6 font-mono">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                    <Cpu className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-bold text-neutral-200 uppercase">Core Technology Architecture</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeProduct.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[9px] bg-neutral-900/60 border border-neutral-900 rounded font-semibold text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">Workspace Dependencies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeProduct.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="px-2 py-0.5 text-[9px] bg-neutral-950/60 border border-neutral-900/60 rounded text-neutral-400 font-mono"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* DYNAMIC TELEMETRY SIMULATOR PANEL */}
              <div className="p-8 rounded-2xl glass-panel border border-neutral-900 flex flex-col gap-6 font-mono">
                <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-bold text-neutral-200 uppercase">Interactive Live Telemetry Simulator</span>
                </div>
                
                {activeTab === 'nexus' && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 font-semibold flex justify-between">
                        <span>ORCHESTRATOR RISK LIMITER THRESHOLD</span>
                        <span className="text-amber-400 font-bold">{nexusThreshold.toFixed(2)}</span>
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={nexusThreshold}
                        onChange={(e) => setNexusThreshold(parseFloat(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-lg text-[10px]">
                      <div>
                        <span className="text-neutral-500 block uppercase">Auto-Approve Rate</span>
                        <span className="text-sm font-bold text-neutral-200">{getNexusStats().autoApprove}%</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Batch Review Scope</span>
                        <span className="text-sm font-bold text-neutral-200">{getNexusStats().batchReview} units</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Mitigation Status</span>
                        <span className={`text-sm font-bold ${nexusThreshold > 0.8 ? 'text-red-400' : 'text-green-400'}`}>
                          {getNexusStats().haltState}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'salsette' && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 font-semibold flex justify-between">
                        <span>PREDICTIVE CLIMATIC PRECIPITATION INTENSITY</span>
                        <span className="text-amber-400 font-bold">{salsetteRain} mm/hr</span>
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        value={salsetteRain}
                        onChange={(e) => setSalsetteRain(parseInt(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-lg text-[10px]">
                      <div>
                        <span className="text-neutral-500 block uppercase">Inundated Grid Cells</span>
                        <span className="text-sm font-bold text-neutral-200">{getSalsetteStats().grids} / 216k</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Loss Loop Validation</span>
                        <span className="text-sm font-bold text-neutral-200">{getSalsetteStats().runTime}s</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Safety Barrier</span>
                        <span className={`text-sm font-bold ${salsetteRain > 90 ? 'text-amber-400' : 'text-green-400'}`}>
                          {getSalsetteStats().severity}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'solver' && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 font-semibold flex justify-between">
                        <span>STRESS LIMIT FACTOR (STRESS_LIMIT_FACTOR)</span>
                        <span className="text-amber-400 font-bold">{solverStress.toFixed(3)}</span>
                      </label>
                      <input
                        type="range"
                        min="0.01"
                        max="0.20"
                        step="0.01"
                        value={solverStress}
                        onChange={(e) => setSolverStress(parseFloat(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-lg text-[10px]">
                      <div>
                        <span className="text-neutral-500 block uppercase">Solver Iteration</span>
                        <span className="text-sm font-bold text-neutral-200">{getSolverStats().computeTime}ms</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Boundary State</span>
                        <span className={`text-sm font-bold ${getSolverStats().isCritical ? 'text-red-400' : 'text-green-400'}`}>
                          {getSolverStats().isCritical ? 'LIMIT EXCEEDED' : 'STABLE'}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-neutral-500 block uppercase">Compile Checks</span>
                        <span className="text-[9px] text-neutral-400 mt-0.5">
                          {getSolverStats().isCritical ? '⚠️ Instability Error' : '✅ Mass Matrix Locked'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'aegis' && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 font-semibold flex justify-between">
                        <span>AEGIS TWIN ASPECT VIEWPORT SCALE FACTOR</span>
                        <span className="text-amber-400 font-bold">{aegisHeight.toFixed(2)}x</span>
                      </label>
                      <input
                        type="range"
                        min="1.0"
                        max="2.5"
                        step="0.10"
                        value={aegisHeight}
                        onChange={(e) => setAegisHeight(parseFloat(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-lg text-[10px]">
                      <div>
                        <span className="text-neutral-500 block uppercase">Helix Twin Twist</span>
                        <span className="text-sm font-bold text-neutral-200">{getAegisStats().twist}° angle</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Structural Strain</span>
                        <span className="text-sm font-bold text-neutral-200">0.08% nominal</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Foundation Load</span>
                        <span className="text-sm font-bold text-cyan-400">{getAegisStats().load} MT</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'kaos' && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 font-semibold flex justify-between">
                        <span>SPEECH RECOGNITION CONFIDENCE GATE</span>
                        <span className="text-amber-400 font-bold">{getKaosStats().voiceConfidence}% threshold</span>
                      </label>
                      <input
                        type="range"
                        min="0.4"
                        max="0.95"
                        step="0.05"
                        value={kaosConfidence}
                        onChange={(e) => setKaosConfidence(parseFloat(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-lg text-[10px]">
                      <div>
                        <span className="text-neutral-500 block uppercase">Voice Command Status</span>
                        <span className={`text-sm font-bold ${getKaosStats().isMismatched ? 'text-red-400' : 'text-green-400'}`}>
                          {getKaosStats().isMismatched ? 'MUTED (LOW CONF)' : 'ROUTING ACTIVE'}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Honeypot Lures</span>
                        <span className="text-sm font-bold text-neutral-200">10,000 active</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Breach Effector</span>
                        <span className="text-sm font-bold text-green-400">SECURE DOCK</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'health' && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 font-semibold flex justify-between">
                        <span>METADATA COMPARATIVE SYNC timeframe</span>
                        <span className="text-amber-400 font-bold">{healthWindow} seconds</span>
                      </label>
                      <input
                        type="range"
                        min="60"
                        max="900"
                        step="30"
                        value={healthWindow}
                        onChange={(e) => setHealthWindow(parseInt(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-lg text-[10px]">
                      <div>
                        <span className="text-neutral-500 block uppercase">Empanelment Match</span>
                        <span className="text-sm font-bold text-neutral-200">{getHealthStats().matchProb}%</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">DPDP Consent</span>
                        <span className={`text-sm font-bold ${healthWindow > 400 ? 'text-amber-400' : 'text-green-400'}`}>
                          {getHealthStats().status}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Registry Bridge</span>
                        <span className="text-[9px] text-neutral-400 mt-0.5">ABHA Consent Linked</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'protofolio' && (
                  <div className="flex flex-col gap-4 text-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-neutral-400 font-semibold flex justify-between">
                        <span>SECURITY RATE-LIMIT COOLDOWN THRESHOLD</span>
                        <span className="text-amber-400 font-bold">{protofolioLimit} req/min</span>
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={protofolioLimit}
                        onChange={(e) => setProtofolioLimit(parseInt(e.target.value))}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 p-3.5 bg-neutral-950/40 border border-neutral-900 rounded-lg text-[10px]">
                      <div>
                        <span className="text-neutral-500 block uppercase">Lockout Trigger</span>
                        <span className="text-sm font-bold text-neutral-200">{protofolioLimit < 15 ? 'ACTIVE' : 'PASSIVE'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Defense Health</span>
                        <span className={`text-sm font-bold ${protofolioLimit < 15 ? 'text-red-400' : 'text-green-400'}`}>
                          {getProtofolioStats().health}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase">Cryptographic Hashes</span>
                        <span className="text-[9px] text-neutral-400 mt-0.5">argon2-cffi locked</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TELEMETRY VISUALS GALLERY */}
              <div className="p-8 rounded-2xl glass-panel border border-neutral-900 flex flex-col gap-6 font-mono">
                <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                  <span className="text-[10px] font-bold text-neutral-200 uppercase">System Telemetry & Architecture Visuals</span>
                </div>
                
                {activeTab === 'salsette' && (
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] text-neutral-500 uppercase">Command Portal UI Previews & Neural Explanations</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 border border-neutral-900 p-2.5 rounded-xl bg-neutral-950/40">
                        <img src="/assets/hufp_admin_index.png" alt="Admin Portal Preview" className="rounded-lg border border-neutral-900" />
                        <span className="text-[9px] text-neutral-500 text-center mt-1">Sovereign Hydrological Command Portal</span>
                      </div>
                      <div className="flex flex-col gap-1.5 border border-neutral-900 p-2.5 rounded-xl bg-neutral-950/40">
                        <img src="/assets/hufp_admin_expert.png" alt="Expert Mode Analytics" className="rounded-lg border border-neutral-900" />
                        <span className="text-[9px] text-neutral-500 text-center mt-1">Expert Neural Calibration View</span>
                      </div>
                      <div className="flex flex-col gap-1.5 border border-neutral-900 p-2.5 rounded-xl bg-neutral-950/40">
                        <img src="/assets/TACTICAL_SHAP_WATERFALL.png" alt="SHAP Attribution Analysis" className="rounded-lg border border-neutral-900" />
                        <span className="text-[9px] text-neutral-500 text-center mt-1">PINN SHAP Waterfall Perturbation values</span>
                      </div>
                      <div className="flex flex-col gap-1.5 border border-neutral-900 p-2.5 rounded-xl bg-neutral-950/40">
                        <img src="/assets/TACTICAL_CONVERGENCE_CHART.png" alt="Model Loss Convergence" className="rounded-lg border border-neutral-900" />
                        <span className="text-[9px] text-neutral-500 text-center mt-1">PyTorch Epoch Loss Convergence Metrics</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'aegis' && (
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] text-neutral-500 uppercase">Aegis 26-Floor 3D Habitat Visual Twin</span>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-1.5 border border-neutral-900 p-2.5 rounded-xl bg-neutral-950/40">
                        <img src="/assets/aegis_tower_live.png" alt="Aegis Tower Live View" className="rounded-lg border border-neutral-900 max-h-96 object-cover" />
                        <span className="text-[9px] text-neutral-500 text-center mt-1">WebGL 3D Rotating Model (aegis-mumbai)</span>
                      </div>
                      
                      {/* External Link Portal */}
                      <a
                        href="https://aegis-mumbai.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-sky-950/20 text-sky-400 border border-sky-500/30 hover:bg-sky-950/40 hover:border-sky-400 transition-all duration-200 text-center text-[10px] font-bold tracking-wider cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>EXPLORE LIVE AEGIS TOWER PORTAL [aegis-mumbai.vercel.app]</span>
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === 'kaos' && (
                  <div className="flex flex-col gap-4 text-[10px]">
                    <span className="text-neutral-500 uppercase">KAOS Command Center Voice Parser Logs</span>
                    <div className="border border-neutral-900 p-4 rounded-xl bg-neutral-950/40 flex flex-col gap-3 font-mono">
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-1">
                        <span className="text-amber-500">VOICE PARSING ENGINE v3.1</span>
                        <span>STATUS: LISTENING</span>
                      </div>
                      <div className="flex flex-col gap-1.5 text-neutral-400">
                        <div><span className="text-neutral-600">[12:04:11]</span> [IDLE] Awaiting wake word activation challenge...</div>
                        <div><span className="text-neutral-600">[12:05:02]</span> [AUDIO] Signal level: 42dB, RMS: 0.12</div>
                        <div><span className="text-neutral-600">[12:05:03]</span> [PARSED] Transcription: <code className="text-amber-400">"speak warning"</code> (Confidence: {getKaosStats().voiceConfidence}%)</div>
                        <div><span className="text-neutral-600">[12:05:03]</span> [LLVM IR] Executing logical routine code: <code className="text-amber-500">6004</code></div>
                        <div><span className="text-neutral-600">[12:05:04]</span> [EFFECTOR] Text-to-speech engine triggered: "WARNING: Aegis network boundary lock is active."</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'nexus' && (
                  <div className="flex flex-col gap-4 text-[10px]">
                    <span className="text-neutral-500 uppercase">Stateful DAG Engine Orchestration Scheme</span>
                    <div className="border border-neutral-900 p-4 rounded-xl bg-neutral-950/40 flex flex-col gap-3 font-semibold">
                      <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-1">
                        <span className="text-amber-500">MCP NODE CLUSTER</span>
                        <span>STATUS: ROUTING</span>
                      </div>
                      <div className="flex flex-col gap-2 relative pl-4 border-l border-neutral-900">
                        <div className="flex justify-between items-center bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-950">
                          <span>[1] Orchestrator Node</span>
                          <span className="text-green-500">INBOUND EVENT RECEIVED</span>
                        </div>
                        <div className="flex justify-between items-center bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-950">
                          <span>[2] Deterministic Arbitrator</span>
                          <span className="text-amber-400">EVALUATING BLAST RADIUS</span>
                        </div>
                        <div className="flex justify-between items-center bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-950">
                          <span>[3] Agent Execution Gate</span>
                          <span className="text-neutral-500">PENDING ACTION RESPONSE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'solver' && (
                  <div className="flex flex-col gap-4 text-[10px]">
                    <span className="text-neutral-500 uppercase">PyO3 maturins boundary compiler specs</span>
                    <div className="border border-neutral-900 p-4 rounded-xl bg-neutral-950/40 flex flex-col gap-3">
                      <pre className="text-[9px] text-amber-500/90 leading-relaxed overflow-x-auto">
{`$ maturin build --release
🏁 Compiling ppf-contact-solver-core v0.1.0 (Rust to WASM/SharedLib)
   Compiling autocfg v1.1.0
   Compiling nalgebra v0.32.2
   Compiling pyo3 v0.21.0
   Compiling ppf-contact-solver v0.1.0 (c:/Producttolaunch/managerAI/ppf-contact-solver)
✓ Finished release target in 14.82s
🚀 PyO3 bindings exported: ppf_contact_solver.pyd (RadixSort ACCD dynamic link library)`}
                      </pre>
                    </div>
                  </div>
                )}

                {activeTab !== 'salsette' && activeTab !== 'aegis' && activeTab !== 'kaos' && activeTab !== 'nexus' && activeTab !== 'solver' && (
                  <div className="text-center py-6 text-neutral-500 text-xs font-mono">
                    <span>Telemetry pipeline active. Simulated audits are running locally.</span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: GTM Pitch, Deployment & Market metrics */}
            <div className="flex flex-col gap-6">
              {/* Deployment Info */}
              <div className="p-6 rounded-xl glass-panel border border-neutral-900 flex flex-col gap-4 font-mono">
                <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                  <Server className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-bold text-neutral-200 uppercase">Deployment Model</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-neutral-300">{activeProduct.deployment}</span>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest mt-1">Sovereign / Air-Gapped License</span>
                </div>
              </div>

              {/* Economic & Market metrics */}
              <div className="p-6 rounded-xl glass-panel border border-neutral-900 flex flex-col gap-4 font-mono">
                <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                  <Landmark className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] font-bold text-neutral-200 uppercase">Indian Market Exposure</span>
                </div>
                <div className="flex flex-col gap-3 mt-1">
                  {activeProduct.marketMetrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col gap-1 border-l border-neutral-800 pl-3">
                      <span className="text-[9px] text-neutral-500 uppercase tracking-none">{metric.label}</span>
                      <span className="text-sm font-bold text-amber-400 font-mono leading-none mt-1">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GTM Pitch & Actions */}
              <div className="p-6 rounded-xl glass-panel border border-neutral-900 flex flex-col gap-4 font-mono grow justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-bold text-neutral-200 uppercase">Commercial Value Moats</span>
                  </div>
                  <ul className="flex flex-col gap-3.5 mt-1 list-none pl-0">
                    {activeProduct.gtmPitch.map((point, idx) => (
                      <li key={idx} className="flex gap-2 text-[11px] text-neutral-400 leading-normal items-start">
                        <span className="text-green-400 font-bold shrink-0 mt-0.5">✔</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Get Quote CTA */}
                <button
                  onClick={() => triggerQuote(activeProduct.name)}
                  className="w-full mt-6 py-2.5 rounded bg-amber-950/20 text-amber-400 border border-amber-500/30 hover:bg-amber-950/40 hover:border-amber-400 font-bold text-[10px] tracking-wider transition-all duration-200 cursor-pointer shadow-md uppercase"
                >
                  REQUEST LICENSE QUOTE
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. FOOTER */}
      <div className="w-full text-center font-mono text-[9px] text-neutral-600 border-t border-neutral-900 pt-6">
        <span>AXIYON INTELLIGENCE © 2026 // SOVEREIGN INDUSTRIAL HOLDINGS</span>
      </div>
      </div>
    </ClickSpark>
  );
}
