"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function DeleteAccountButton({
  redirectTo = "/auth",
  warning = "This permanently deletes your account, saved favorites, and cart. This cannot be undone.",
}: {
  redirectTo?: string;
  warning?: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const canConfirm = confirmText.trim().toUpperCase() === "DELETE";

  const handleDelete = async () => {
    if (!canConfirm || isDeleting) return;
    setIsDeleting(true);

    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      const body = await res.json();

      if (!res.ok) {
        throw new Error(body?.error || "Failed to delete account");
      }

      const supabase = getSupabaseBrowserClient();
      await supabase?.auth.signOut();
      queryClient.clear();
      toast.success("Account deleted");
      router.replace(redirectTo);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete account");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 text-sm text-destructive font-bold hover:bg-destructive/5 rounded-[2.5rem] transition-smooth border border-transparent hover:border-destructive/10"
      >
        <Trash2 className="w-5 h-5" />
        Delete Account
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 p-4">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="w-full max-w-md bg-background border border-border rounded-[2.5rem] p-6 sm:p-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold tracking-tight text-destructive">Delete account?</h3>
                <button
                  onClick={() => {
                    setOpen(false);
                    setConfirmText("");
                  }}
                  className="p-2 hover:bg-secondary rounded-full"
                  disabled={isDeleting}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{warning}</p>

              <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Type DELETE to confirm
              </label>
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                disabled={isDeleting}
                className="w-full h-11 rounded-2xl border border-border bg-secondary/30 px-4 text-sm font-bold tracking-widest text-center outline-none focus-visible:ring-2 focus-visible:ring-destructive mb-6 disabled:opacity-50"
              />

              <button
                onClick={handleDelete}
                disabled={!canConfirm || isDeleting}
                className="w-full h-12 rounded-2xl bg-destructive text-destructive-foreground font-bold text-sm disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] transition-all"
              >
                {isDeleting ? "Deleting..." : "Permanently Delete My Account"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
