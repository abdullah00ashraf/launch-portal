export interface PuzzleContextType {
  unlockedKeys: string[];
  unlockKey: (key: string) => void;
  isFullyDecrypted: boolean;
  isConnectUnlocked: boolean;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  scrambleText: (text: string, count: number) => string;
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
}

export interface ConnectionFormInput {
  userIdentity: string;
  orgName: string;
  classification: string;
  description: string;
  product: string;
}

export interface TerminalLog {
  text: string;
  type: 'info' | 'success' | 'warn' | 'error';
  timestamp: string;
}

