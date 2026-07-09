"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function UrlForm({ onSubmit, loading }: UrlFormProps) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const kusonimeRegex = /^https?:\/\/(www\.)?kusonime\.com\/[a-zA-Z0-9-]+\/?$/;
    setIsValid(kusonimeRegex.test(value.trim()));
  }, [value]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || loading) return;
    onSubmit(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
    
      <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch">
        
        <div className="hard-border flex-1 bg-kuso-paper flex items-center px-4 py-2 sm:py-0 relative focus-within:ring-4 focus-within:ring-kuso-tape transition-shadow">
          <span className="font-mono text-xs font-bold text-kuso-ink/50 mr-3 select-none">
            URL//
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://kusonime.com/judul-anime/"
            disabled={loading}
            className="flex-1 border-none outline-none bg-transparent py-3 sm:py-4 font-mono text-sm sm:text-base text-kuso-ink disabled:opacity-50 w-full"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading || (!isValid && value.length > 0)}
          
          whileHover={(!loading && isValid || value.length === 0) ? { y: -2, x: -2, boxShadow: "8px 8px 0px 0px #14121f" } : {}}
          whileTap={(!loading && isValid || value.length === 0) ? { y: 4, x: 4, boxShadow: "0px 0px 0px 0px #14121f" } : {}}
          
          className={`
            hard-border font-display font-bold text-base tracking-wide flex items-center justify-center gap-2 min-w-[160px] px-6 py-4 
            transition-colors duration-200
            ${loading 
              ? "bg-kuso-mustard text-kuso-ink shadow-hard cursor-wait" 
              : isValid || value.length === 0 
                ? "bg-kuso-blue hover:bg-kuso-pink text-white shadow-hard" 
                : "bg-kuso-ink/10 text-kuso-ink/40 border-kuso-ink/20 shadow-none cursor-not-allowed"}
          `}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> PARSING
            </>
          ) : (
            <>
              <Search className="w-5 h-5" /> SEARCH
            </>
          )}
        </motion.button>
      </div>

      <div className="h-6 mt-2">
        {value.length > 0 && !isValid && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-kuso-pink font-bold inline-flex items-center gap-2 bg-kuso-pink/10 px-2 py-1 rounded"
          >
            <span className="w-2 h-2 rounded-full bg-kuso-pink animate-pulse" />
            Masukkan URL artikel Kusonime yang valid.
          </motion.p>
        )}
      </div>
    </form>
  );
}