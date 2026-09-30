'use client';

import React, { useState } from 'react';
import { PillarLayout } from '@/components/ui/PillarLayout';
import { Network, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AgentMesh() {
  const [deadlockCleared, setDeadlockCleared] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const description = 
    "The nexusorch platform coordinates autonomous, domain-specific AI agents (Finance, Marketing, DevOps, Resources) using structured LangGraph Directed Acyclic Graphs (DAGs). Execution paths are evaluated against strict Risk Matrices, with an autonomous Arbitrator Node routing tasks dynamically to prevent cycle loops. A local zero-SaaS SQLite telemetry sink traces execution spans, ensuring complete governance and auditing capabilities within secure enterprise networks.";

  const codeSnippet = `# File: arbitration/arbitrator_node.py
# LangGraph state-directed arbitration handler
from state import PlatformGlobalState, ExecutionDAG

def arbitrator_node(state: PlatformGlobalState) -> PlatformGlobalState:
    dag = state.get("execution_dag")
    if not dag or not dag.arbitration_rules:
        return state

    # Priority scale: compliance > hard_cap > soft_preference
    rule_hierarchy = { "compliance": 1, "hard_cap": 2, "soft_preference": 3 }
    sorted_rules = sorted(
        dag.arbitration_rules,
        key=lambda r: (rule_hierarchy.get(r.constraint_type, 99), r.priority)
    )
    
    # Circuit breaker: escalate if stuck in loop
    if dag.arbitration_lock:
        dag.deadlock_escalated = True
        print("[ESCALATE] Deadlock constraint hit. Invoking human gatekeeper.")
        return state
        
    for rule in sorted_rules:
        print(f"[ARBITRATION] Enforcing {rule.constraint_type} on domain {rule.owning_domain}")
        # Graph node updates...
        
    return state`;

  const handleNodeClick = () => {
    if (deadlockCleared) return;
    setDeadlockCleared(true);
    setShowNotification(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Header details */}
      <PillarLayout
        title="nexusorch: Multi-Agent Orchestration & Governance Mesh"
        description={description}
        codeSnippet={codeSnippet}
        targetKey="NEXUS"
        color="#6366f1" // Indigo
        consoleActionLabel="RESOLVE DEADBANDS & AUDIT"
        consoleCommandPrompt="python main.py --arbitrate"
        consoleSuccessLog="[OK] ARBITRATION_VERIFY: execution DAG resolved. Deadlocks cleared."
        onUnlockSecret={() => {
          // Force user to clear the deadlock first
          return deadlockCleared;
        }}
      />

      {/* Interactive Deadlock Resolution Overlay at bottom */}
      <div className="bg-slate-950 p-6 sm:p-12 border-t border-slate-900 flex flex-col items-center justify-center gap-6">
        <div className="max-w-xl text-center flex flex-col gap-2 font-mono">
          <span className="text-[10px] text-cyan-400 font-bold tracking-wider">INTERACTIVE FAULT SIMULATOR</span>
          <h3 className="text-lg font-bold text-slate-200">LangGraph Mesh Routing Anomaly Detector</h3>
          <p className="text-xs text-slate-400">
            Below is the current agent routing graph. An arbitration lock has occurred between the DevOps and Resource nodes. Click the deadlocked node to apply security overrides.
          </p>
        </div>

        {/* Visual Map Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-lg border border-slate-900 bg-black max-w-2xl w-full">
          {/* Node 1: Orchestrator */}
          <div className="flex flex-col items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
              <Network className="w-5 h-5" />
            </div>
            <span>Orchestrator</span>
          </div>

          <div className="text-slate-800 font-bold">➔</div>

          {/* Node 2: Finance */}
          <div className="flex flex-col items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300">
              $
            </div>
            <span>Finance</span>
          </div>

          <div className="text-slate-800 font-bold">➔</div>

          {/* Node 3: DevOps & Resources (DEADLOCKED) */}
          <button
            onClick={handleNodeClick}
            className={`flex flex-col items-center gap-1.5 font-mono text-[10px] group transition-all duration-300 ${
              deadlockCleared ? 'text-green-400' : 'text-orange-400 animate-pulse'
            }`}
          >
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center relative ${
              deadlockCleared 
                ? 'bg-green-950/30 border-green-500/50 text-green-400' 
                : 'bg-orange-950/30 border-orange-500/60 text-orange-400 cursor-pointer shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:scale-105'
            }`}>
              {deadlockCleared ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              {/* Flashing glow */}
              {!deadlockCleared && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 animate-ping" />
              )}
            </div>
            <span>{deadlockCleared ? 'Node: Safe' : 'Node: Deadlocked'}</span>
          </button>

          {showNotification && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full text-center mt-4 font-mono text-xs text-green-400 bg-green-950/20 border border-green-500/30 py-2 px-4 rounded-lg"
            >
              🎉 DEADLOCK CONFLICT ESCALATED & CLEARED. EXECUTE THE SYSTEM AUDIT ABOVE TO RESOLVE THE KEY.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
