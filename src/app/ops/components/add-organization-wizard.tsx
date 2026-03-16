import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../shared/components/ui/dialog";
import { Button } from "../../shared/components/ui/button";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Building2,
  User,
  ClipboardCheck,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface WizardData {
  companyName: string;
  industry: string;
  primaryContact: string;
  logoFile: File | null;
  logoPreview: string | null;
  inviteEmail: string;
}

interface AddOrganizationWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: WizardData) => void;
  existingNames?: string[];
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Non-Profit",
  "Government",
  "Media & Entertainment",
  "Other",
];

const BLACKLISTED_DOMAINS = [
  "tempmail.com",
  "throwaway.email",
  "guerrillamail.com",
  "mailinator.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
];

const STEPS = [
  { id: 1, label: "Details", icon: Building2 },
  { id: 2, label: "Users", icon: User },
  { id: 3, label: "Review", icon: ClipboardCheck },
];

const INITIAL_DATA: WizardData = {
  companyName: "",
  industry: "",
  primaryContact: "",
  logoFile: null,
  logoPreview: null,
  inviteEmail: "",
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function AddOrganizationWizard({
  open,
  onOpenChange,
  onSubmit,
  existingNames = [],
}: AddOrganizationWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({ ...INITIAL_DATA });
  const [errors, setErrors] = useState<
    Partial<Record<keyof WizardData | "logo", string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  /* ---- helpers --------------------------------------------------- */

  const reset = useCallback(() => {
    setStep(1);
    setData({ ...INITIAL_DATA });
    setErrors({});
    setSubmitted(false);
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) reset();
      onOpenChange(nextOpen);
    },
    [onOpenChange, reset],
  );

  const updateField = <K extends keyof WizardData>(
    key: K,
    value: WizardData[K],
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  /* ---- validation ------------------------------------------------ */

  const validateStep1 = (): boolean => {
    const errs: Partial<Record<keyof WizardData | "logo", string>> = {};
    if (!data.companyName.trim())
      errs.companyName = "Company Name is required.";
    else if (
      existingNames.some(
        (n) => n.toLowerCase() === data.companyName.trim().toLowerCase(),
      )
    )
      errs.companyName = "An organization with this name already exists.";
    if (!data.industry) errs.industry = "Industry is required.";
    if (!data.primaryContact.trim())
      errs.primaryContact = "Primary Contact is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Partial<Record<keyof WizardData | "logo", string>> = {};
    const email = data.inviteEmail.trim();
    if (!email) {
      errs.inviteEmail = "Invitation email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.inviteEmail = "Please enter a valid email address.";
    } else {
      const domain = email.split("@")[1]?.toLowerCase();
      if (domain && BLACKLISTED_DOMAINS.includes(domain)) {
        errs.inviteEmail = "Disposable email domains are not allowed.";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ---- blur validation for Company Name (change #2) --------------- */

  const handleCompanyNameBlur = () => {
    const name = data.companyName.trim();
    if (!name) return; // don't show "already exists" for empty — that fires on Next
    if (existingNames.some((n) => n.toLowerCase() === name.toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        companyName: "An organization with this name already exists.",
      }));
    }
  };

  /* ---- navigation ------------------------------------------------ */

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    onSubmit?.(data);
    setSubmitted(true);
  };

  /* ---- logo upload ----------------------------------------------- */

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/png", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: "Only PNG or SVG files are allowed.",
      }));
      return;
    }
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.logo;
      return copy;
    });
    const reader = new FileReader();
    reader.onload = () =>
      setData((prev) => ({
        ...prev,
        logoFile: file,
        logoPreview: reader.result as string,
      }));
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    updateField("logoFile", null);
    updateField("logoPreview", null);
  };

  /* ---- drop handler ---------------------------------------------- */

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const allowed = ["image/png", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: "Only PNG or SVG files are allowed.",
      }));
      return;
    }
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.logo;
      return copy;
    });
    const reader = new FileReader();
    reader.onload = () =>
      setData((prev) => ({
        ...prev,
        logoFile: file,
        logoPreview: reader.result as string,
      }));
    reader.readAsDataURL(file);
  };

  /* ---- render helpers -------------------------------------------- */

  const FieldError = ({ field }: { field: keyof WizardData | "logo" }) =>
    errors[field] ? (
      <p
        className="flex items-center gap-1 text-destructive mt-1"
        style={{ fontSize: "0.75rem" }}
      >
        <AlertCircle className="size-3 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  /* ---- success state --------------------------------------------- */

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[480px] shadow-none border border-border">
          <div className="flex flex-col items-center py-6 gap-4 text-center">
            <div className="flex items-center justify-center size-12 rounded-full bg-green-50 border border-green-200">
              <Check className="size-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-foreground">Organization Created</h3>
              <p
                className="text-muted-foreground mt-1"
                style={{ fontSize: "0.875rem" }}
              >
                <span className="text-foreground" style={{ fontWeight: 500 }}>
                  {data.companyName}
                </span>{" "}
                has been created and an invitation email has been sent to{" "}
                <span className="text-foreground" style={{ fontWeight: 500 }}>
                  {data.inviteEmail}
                </span>
                .
              </p>
            </div>
            <Button
              className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer mt-2"
              onClick={() => handleOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* ================================================================ */
  /* MAIN RENDER                                                       */
  /* ================================================================ */

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[560px] shadow-none border border-border gap-0 p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Add Organization</DialogTitle>
          <DialogDescription style={{ fontSize: "0.8125rem" }}>
            Onboard a new trial client organization in 3 steps.
          </DialogDescription>
        </DialogHeader>

        {/* Stepper */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const isComplete = step > s.id;
              const isCurrent = step === s.id;
              const Icon = s.icon;
              return (
                <React.Fragment key={s.id}>
                  {i > 0 && (
                    <div
                      className={`flex-1 h-px mx-2 ${
                        step > s.id ? "bg-[#7D152D]" : "bg-border"
                      }`}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center size-8 rounded-full border transition-colors ${
                        isComplete
                          ? "bg-[#7D152D] border-[#7D152D] text-white"
                          : isCurrent
                            ? "border-[#7D152D] text-[#7D152D] bg-[#7D152D]/5"
                            : "border-border text-muted-foreground bg-card"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="size-4" />
                      ) : (
                        <Icon className="size-4" />
                      )}
                    </div>
                    <span
                      className={`hidden sm:inline ${
                        isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: isCurrent ? 500 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 pb-6 space-y-4" style={{ minHeight: "260px" }}>
          {/* ---- STEP 1: Details ---- */}
          {step === 1 && (
            <>
              {/* Company Name */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Company Name <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  onBlur={handleCompanyNameBlur}
                  placeholder="e.g. Acme Corp"
                  aria-invalid={!!errors.companyName}
                />
                <FieldError field="companyName" />
              </div>

              {/* Logo Upload */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Logo{" "}
                  <span className="text-muted-foreground">(PNG or SVG)</span>
                </label>
                {data.logoPreview ? (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <img
                      src={data.logoPreview}
                      alt="Logo preview"
                      className="size-10 object-contain rounded"
                    />
                    <span
                      className="flex-1 text-foreground truncate"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {data.logoFile?.name}
                    </span>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg border border-dashed border-border hover:border-[#7D152D]/40 transition-colors cursor-pointer"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                  >
                    <Upload className="size-5 text-muted-foreground" />
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Drag & drop or{" "}
                      <span
                        className="text-[#7D152D]"
                        style={{ fontWeight: 500 }}
                      >
                        browse
                      </span>
                    </p>
                    <input
                      id="logo-upload"
                      type="file"
                      accept=".png,.svg"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </div>
                )}
                <FieldError field="logo" />
              </div>

              {/* Industry */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Industry <span className="text-destructive">*</span>
                </label>
                <select
                  value={data.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                  className="w-full bg-transparent rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 focus:border-[#7D152D] transition-colors appearance-none cursor-pointer"
                  style={{ fontSize: "0.875rem" }}
                >
                  <option value="">Select an industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                <FieldError field="industry" />
              </div>

              {/* Primary Contact */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Primary Contact <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={data.primaryContact}
                  onChange={(e) =>
                    updateField("primaryContact", e.target.value)
                  }
                  placeholder="Full name of main contact"
                />
                <FieldError field="primaryContact" />
              </div>
            </>
          )}

          {/* ---- STEP 2: Users ---- */}
          {step === 2 && (
            <>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p
                  className="text-foreground"
                  style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                >
                  Invite the initial Trial Client Staff user
                </p>
                <p
                  className="text-muted-foreground mt-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  This person will receive an activation email and can then
                  invite additional team members from within their organization.
                </p>
              </div>
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Email Address <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  value={data.inviteEmail}
                  onChange={(e) => updateField("inviteEmail", e.target.value)}
                  placeholder="user@company.com"
                  aria-invalid={!!errors.inviteEmail}
                />
                <FieldError field="inviteEmail" />
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 flex items-start gap-2">
                <AlertCircle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-amber-800" style={{ fontSize: "0.75rem" }}>
                  Disposable email domains (e.g. mailinator.com, yopmail.com)
                  are not accepted.
                </p>
              </div>
            </>
          )}

          {/* ---- STEP 3: Review ---- */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border divide-y divide-border">
                {/* Org details */}
                <div className="p-4 space-y-3">
                  <p
                    className="text-muted-foreground uppercase tracking-wider"
                    style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                  >
                    Organization Details
                  </p>
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 gap-x-4">
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Company
                    </span>
                    <span
                      className="text-foreground"
                      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                    >
                      {data.companyName}
                    </span>
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Industry
                    </span>
                    <span
                      className="text-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {data.industry}
                    </span>
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Primary Contact
                    </span>
                    <span
                      className="text-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {data.primaryContact}
                    </span>
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Logo
                    </span>
                    <span
                      className="text-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {data.logoFile ? (
                        <span className="flex items-center gap-2">
                          <img
                            src={data.logoPreview!}
                            alt=""
                            className="size-6 object-contain rounded"
                          />
                          {data.logoFile.name}
                        </span>
                      ) : (
                        <span className="text-muted-foreground italic">
                          None
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                {/* User invite */}
                <div className="p-4 space-y-3">
                  <p
                    className="text-muted-foreground uppercase tracking-wider"
                    style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                  >
                    Initial User
                  </p>
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 gap-x-4">
                    <span
                      className="text-muted-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      Invite Email
                    </span>
                    <span
                      className="text-foreground"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {data.inviteEmail}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  Clicking <strong>Create Organization</strong> will create the
                  tenant and send an activation email to the invited user.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-border flex-row justify-between sm:justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={goBack}
              className="cursor-pointer"
            >
              <ChevronLeft className="size-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button
              className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
              onClick={goNext}
            >
              Next
              <ChevronRight className="size-4 ml-1" />
            </Button>
          ) : (
            <Button
              className="bg-[#7D152D] hover:bg-[#7D152D]/90 cursor-pointer"
              onClick={handleSubmit}
            >
              <Check className="size-4 mr-1" />
              Create Organization
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
