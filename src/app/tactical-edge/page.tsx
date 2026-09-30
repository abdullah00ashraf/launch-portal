'use client';

import React from 'react';
import { PillarLayout } from '@/components/ui/PillarLayout';

export default function TacticalEdge() {
  const description = 
    "The AI Tower and KAOS interfaces establish the localized operational control cockpits. This edge-based ecosystem acts as the central intelligence node: coordinating a real-time, low-latency WebGL visualization framework with multi-client WebSocket routing nodes. Integrating local, air-gapped speech recognition (Whisper STT) and speech synthesis (Piper TTS) modules, the cockpit processes high-speed UDP radar signals and executes mechanical grid actuations in milliseconds, keeping the physical asset insulated from external cloud latency.";

  const codeSnippet = `// File: aegis-oracle-core/src/index.ts
// Node.js WebSocket router relaying edge telemetry & voice bytes
import { WebSocketServer, WebSocket } from 'ws';
import { SovereignRouter } from './core/SovereignRouter';

const wss = new WebSocketServer({ port: 8080 });
const router = new SovereignRouter();

wss.on('connection', (ws: WebSocket) => {
    console.log('[AEGIS_ORACLE] Real-time client gateway established.');
    
    ws.on('message', async (message: Buffer) => {
        // Relays raw audio chunks and JSON commands to Python engine
        const response = await router.processIncomingPayload(message);
        if (response) {
            ws.send(JSON.stringify(response));
        }
    });
    
    ws.on('close', () => {
        console.log('[AEGIS_ORACLE] Connection closed.');
    });
});`;

  return (
    <PillarLayout
      title="AI Tower & KAOS: Low-Latency Operational Edge Control"
      description={description}
      codeSnippet={codeSnippet}
      targetKey="TOWER"
      color="#f59e0b" // Amber
      consoleActionLabel="DEPLOY OVERRIDE CONSTANT"
      consoleCommandPrompt="sys_init --override"
      consoleSuccessLog="[OK] BYPASS_SECURE_OVERRIDE: tactical override verified. Sovereign node unlocked."
      placeholderParam="ENTER EXCH COMMAND (e.g. sys_init --override)"
      onUnlockSecret={(param) => param.trim() === 'sys_init --override'}
    />
  );
}
