import * as React from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ComingSoonModal = ({ isOpen, onClose, featureName, customMessage, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary-indigo">
                <Sparkles size={32} />
              </div>
              
              <h3 className="mb-2 text-xl font-bold text-slate-900">{title || "Feature Coming Soon!"}</h3>
              <p className="mb-8 text-sm text-slate-500 leading-relaxed">
                {customMessage || (
                  <>
                    We're currently polishing the <span className="font-semibold text-slate-800">{featureName}</span> experience. Stay tuned for exciting updates!
                  </>
                )}
              </p>
              
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-primary-indigo px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
              >
                Got it, thanks!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
