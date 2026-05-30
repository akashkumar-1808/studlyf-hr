"use client";

import React, { useEffect } from 'react';
import { useProfileStore } from '@/store/profileStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SaveChangesBar() {
  const { hasUnsavedChanges, saveChanges, discardChanges, saveStatus, resetSaveStatus } = useProfileStore();

  const isVisible = hasUnsavedChanges || saveStatus !== 'idle';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center lg:left-64"
        >
          <div className={`text-white rounded-2xl shadow-2xl pointer-events-auto flex items-center justify-between py-3 px-5 w-full max-w-3xl border transition-colors ${
            saveStatus === 'success' ? 'bg-emerald-600 border-emerald-500' :
            saveStatus === 'error' ? 'bg-red-600 border-red-500' :
            'bg-slate-900 border-slate-700'
          }`}>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                {saveStatus === 'success' ? 'Profile updated successfully' :
                 saveStatus === 'error' ? 'Failed to save profile' :
                 saveStatus === 'saving' ? 'Saving changes...' :
                 'You have unsaved changes'}
              </span>
              <span className={`text-xs ${saveStatus === 'success' || saveStatus === 'error' ? 'text-white/80' : 'text-slate-400'}`}>
                {saveStatus === 'success' ? 'Your profile has been saved securely.' :
                 saveStatus === 'error' ? 'Please try again or check your connection.' :
                 saveStatus === 'saving' ? 'Please wait...' :
                 'Save your changes to update your profile.'}
              </span>
            </div>
            
            {(saveStatus === 'idle' || saveStatus === 'saving') && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={discardChanges}
                  disabled={saveStatus === 'saving'}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Discard
                </button>
                <button
                  onClick={saveChanges}
                  disabled={saveStatus === 'saving'}
                  className="px-5 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  {saveStatus === 'saving' ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  ) : (
                    <Save size={16} />
                  )}
                  {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {saveStatus === 'success' && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl">
                <CheckCircle2 size={18} className="text-white" />
                <span className="text-sm font-bold text-white">Saved</span>
              </div>
            )}

            {saveStatus === 'error' && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl">
                <AlertCircle size={18} className="text-white" />
                <span className="text-sm font-bold text-white">Error</span>
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
