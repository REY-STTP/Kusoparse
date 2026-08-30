"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScanSearch, Loader2 } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { isKusonimeArticleUrl } from "@/lib/urls";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function UrlForm({ onSubmit, loading }: UrlFormProps) {
  const { t } = useLocale();
  const [value, setValue] = useState("");
  const isValid = isKusonimeArticleUrl(value.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || loading) return;
    onSubmit(value.trim());
  }

  const showError = value.length > 0 && !isValid;
  const canInteract = !loading && (isValid || value.length === 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      aria-label={t.form.ariaLabel}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:items-stretch">
        <div className="hard-border flex-1 bg-kuso-paper flex items-center px-4 py-2 sm:py-0 relative transition-all duration-150 focus-within:ring-4 focus-within:ring-kuso-accent/25 focus-within:shadow-hard-sm">
          <span className="font-mono text-xs font-bold text-kuso-ink/50 mr-3 select-none">
            URL//
          </span>
          <label htmlFor="kusonime-url" className="sr-only">
            {t.form.ariaLabel}
          </label>
          <input
            id="kusonime-url"
            name="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t.form.placeholder}
            disabled={loading}
            aria-label={t.form.ariaLabel}
            aria-invalid={showError}
            aria-describedby={showError ? "kusonime-url-error" : undefined}
            required
            inputMode="url"
            enterKeyHint="go"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 border-none outline-none focus-visible:outline-none bg-transparent py-3 sm:py-4 font-mono text-sm sm:text-base text-kuso-ink placeholder:text-kuso-ink/35 disabled:opacity-50 w-full"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading || (!isValid && value.length > 0)}
          whileHover={
            canInteract
              ? { y: -2, x: -2, boxShadow: "8px 8px 0px 0px #171410" }
              : {}
          }
          whileTap={
            canInteract
              ? { y: 4, x: 4, boxShadow: "0px 0px 0px 0px #171410" }
              : {}
          }
          className={`
            hard-border font-display font-bold text-base tracking-wide flex items-center justify-center gap-2 min-w-[160px] px-6 py-4
            transition-colors duration-200
            ${
              loading
                ? "bg-kuso-tape text-kuso-ink shadow-hard cursor-wait"
                : canInteract
                  ? "bg-kuso-accent hover:bg-kuso-ink text-kuso-paper shadow-hard"
                  : "bg-kuso-ink/10 text-kuso-ink/40 border-kuso-ink/20 shadow-none cursor-not-allowed"
            }
          `}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> {t.form.parsing}
            </>
          ) : (
            <>
              <ScanSearch className="w-5 h-5" /> {t.form.button}
            </>
          )}
        </motion.button>
      </div>

      <div className="h-6 mt-2">
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            id="kusonime-url-error"
            className="font-mono text-xs font-bold text-kuso-accent inline-flex items-center gap-2 bg-kuso-accent/10 px-2 py-1"
          >
            <span className="w-2 h-2 bg-kuso-accent animate-pulse" />
            {t.form.invalid}
          </motion.p>
        )}
      </div>
    </form>
  );
}
