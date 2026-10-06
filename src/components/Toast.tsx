import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-black text-cream dark:bg-cream dark:text-black shadow-2xl border border-black/10 dark:border-white/10 font-mono text-xs font-bold">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
