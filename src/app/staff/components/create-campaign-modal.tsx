// =============================================================================
// Create Campaign modal — MM-UI-002 "Create Campaign Flow".
// Fields: Name (required, unique), Description (optional).
// Validates duplicate names inline on blur and on submit.
// =============================================================================

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface CreateCampaignModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => string | null;
  /** List of existing campaign names (lowercased) for uniqueness check */
  existingNames: string[];
}

export function CreateCampaignModal({
  open,
  onClose,
  onSubmit,
  existingNames,
}: CreateCampaignModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus name field when modal opens
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setNameError(null);
      setSubmitting(false);
      setTimeout(() => nameRef.current?.focus(), 100);
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [open]);

  function validateName(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) return "Campaign name is required.";
    if (existingNames.includes(trimmed.toLowerCase()))
      return "Name already in use.";
    return null;
  }

  // Debounced real-time uniqueness check as user types
  const handleNameChange = useCallback(
    (value: string) => {
      setName(value);
      // Clear previous error immediately when user resumes typing
      if (nameError) setNameError(null);
      // Debounce the uniqueness check (300ms)
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const trimmed = value.trim();
        if (trimmed && existingNames.includes(trimmed.toLowerCase())) {
          setNameError("Name already in use.");
        }
      }, 300);
    },
    [existingNames, nameError]
  );

  function handleNameBlur() {
    // On blur, run full validation (including empty check)
    if (name.trim()) {
      setNameError(validateName(name));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const error = validateName(name);
    if (error) {
      setNameError(error);
      nameRef.current?.focus();
      return;
    }
    setSubmitting(true);
    // Simulate brief network delay
    setTimeout(() => {
      const serverError = onSubmit({
        name: name.trim(),
        description: description.trim(),
      });
      if (serverError) {
        setNameError(serverError);
        setSubmitting(false);
      }
    }, 300);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-xl"
        style={{ animation: "fadeUp 0.2s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <h2 style={{ fontSize: "1.125rem", color: "#0F172A" }}>
            Create Campaign
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5">
          {/* Name field */}
          <div className="mb-5">
            <label
              htmlFor="campaign-name"
              style={{ fontSize: "0.875rem", color: "#0F172A" }}
              className="block mb-1.5"
            >
              Name <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              ref={nameRef}
              id="campaign-name"
              type="text"
              value={name}
              onChange={(e) => {
                handleNameChange(e.target.value);
              }}
              onBlur={handleNameBlur}
              placeholder="e.g. Summer Seltzer Launch"
              className={`w-full px-3.5 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                nameError
                  ? "border-[#EF4444] focus:ring-[#EF4444]/30"
                  : "border-[#E2E8F0] focus:ring-[#7D152D]/30"
              }`}
              style={{ fontSize: "0.9375rem", background: "#F8FAFC" }}
              maxLength={120}
            />
            {nameError && (
              <p
                className="mt-1.5"
                style={{ fontSize: "0.8125rem", color: "#EF4444" }}
              >
                {nameError}
              </p>
            )}
          </div>

          {/* Description field */}
          <div className="mb-6">
            <label
              htmlFor="campaign-description"
              style={{ fontSize: "0.875rem", color: "#0F172A" }}
              className="block mb-1.5"
            >
              Description
            </label>
            <textarea
              id="campaign-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the campaign objectives…"
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 resize-none"
              style={{ fontSize: "0.9375rem", background: "#F8FAFC" }}
              maxLength={500}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
              style={{ fontSize: "0.875rem" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-lg text-white transition-opacity disabled:opacity-60"
              style={{ background: "#7D152D", fontSize: "0.875rem" }}
            >
              {submitting ? "Creating…" : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}