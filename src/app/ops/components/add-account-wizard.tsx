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
  Store,
  MapPin,
  ClipboardCheck,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/app/shared/components/ui/input";
import { Account } from "@/lib/account-types";
import { generateAccountId } from "@/lib/account-data";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface AccountWizardData {
  accountName: string;
  type: "on-premise" | "off-premise" | "";
  venueSubType: string;
  status: "active" | "inactive" | "prospect" | "";
  chain: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

interface AddAccountWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (account: Account) => void;
  existingNames?: string[];
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const VENUE_SUB_TYPES = [
  "bar",
  "cocktail-bar",
  "dive-bar",
  "hotel-bar",
  "restaurant",
  "club",
  "liquor-store",
  "grocery",
  "big-box-retail",
  "convenience-store",
  "wine-shop",
  "other",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
  "DC",
];

const STEPS = [
  { id: 1, label: "Venue Details", icon: Store },
  { id: 2, label: "Location & Contact", icon: MapPin },
  { id: 3, label: "Review", icon: ClipboardCheck },
];

const INITIAL_DATA: AccountWizardData = {
  accountName: "",
  type: "",
  venueSubType: "",
  status: "",
  chain: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function AddAccountWizard({
  open,
  onOpenChange,
  onSubmit,
  existingNames = [],
}: AddAccountWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AccountWizardData>({ ...INITIAL_DATA });
  const [errors, setErrors] = useState<Partial<Record<keyof AccountWizardData, string>>>({});
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

  const updateField = <K extends keyof AccountWizardData>(
    key: K,
    value: AccountWizardData[K],
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
    const errs: Partial<Record<keyof AccountWizardData, string>> = {};
    if (!data.accountName.trim()) errs.accountName = "Account Name is required.";
    else if (
      existingNames.some(
        (n) => n.toLowerCase() === data.accountName.trim().toLowerCase(),
      )
    )
      errs.accountName = "An account with this name already exists.";
    if (!data.type) errs.type = "Type is required.";
    if (!data.venueSubType) errs.venueSubType = "Venue Sub-Type is required.";
    if (!data.status) errs.status = "Status is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Partial<Record<keyof AccountWizardData, string>> = {};
    if (!data.address.trim()) errs.address = "Address is required.";
    if (!data.city.trim()) errs.city = "City is required.";
    if (!data.state) errs.state = "State is required.";
    if (!data.zipCode.trim()) errs.zipCode = "Zip Code is required.";
    else if (!/^\d{5}(-\d{4})?$/.test(data.zipCode.trim()))
      errs.zipCode = "Enter a valid US zip code (e.g. 10001).";
    if (!data.contactName.trim()) errs.contactName = "Contact Name is required.";
    if (!data.contactPhone.trim()) errs.contactPhone = "Contact Phone is required.";
    if (data.contactEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail.trim()))
      errs.contactEmail = "Enter a valid email address.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ---- blur validation for Account Name -------------------------- */

  const handleAccountNameBlur = () => {
    const name = data.accountName.trim();
    if (!name) return;
    if (existingNames.some((n) => n.toLowerCase() === name.toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        accountName: "An account with this name already exists.",
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
    const now = new Date().toISOString();
    const newAccount: Account = {
      id: generateAccountId(),
      name: data.accountName.trim(),
      ...(data.chain.trim() ? { chain: data.chain.trim() } : {}),
      type: data.type as "on-premise" | "off-premise",
      status: data.status as "active" | "inactive" | "prospect",
      address: data.address.trim(),
      city: data.city.trim(),
      state: data.state,
      zipCode: data.zipCode.trim(),
      contactName: data.contactName.trim(),
      contactPhone: data.contactPhone.trim(),
      ...(data.contactEmail.trim() ? { contactEmail: data.contactEmail.trim() } : {}),
      profile: {
        venueSubType: data.venueSubType,
        footTrafficEstimate: "medium",
      },
      eventsHosted: 0,
      createdAt: now,
      updatedAt: now,
    };
    onSubmit?.(newAccount);
    setSubmitted(true);
  };

  /* ---- render helpers -------------------------------------------- */

  const FieldError = ({ field }: { field: keyof AccountWizardData }) =>
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
              <h3 className="text-foreground">Account Created</h3>
              <p
                className="text-muted-foreground mt-1"
                style={{ fontSize: "0.875rem" }}
              >
                <span className="text-foreground" style={{ fontWeight: 500 }}>
                  {data.accountName}
                </span>{" "}
                has been added to the Account Master.
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
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription style={{ fontSize: "0.8125rem" }}>
            Register a new venue or retail account in 3 steps.
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
        <div className="px-6 pb-6 space-y-4" style={{ minHeight: "280px" }}>
          {/* ---- STEP 1: Venue Details ---- */}
          {step === 1 && (
            <>
              {/* Account Name */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Account Name <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={data.accountName}
                  onChange={(e) => updateField("accountName", e.target.value)}
                  onBlur={handleAccountNameBlur}
                  placeholder="e.g. The Dead Rabbit"
                  aria-invalid={!!errors.accountName}
                />
                <FieldError field="accountName" />
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Type <span className="text-destructive">*</span>
                </label>
                <select
                  value={data.type}
                  onChange={(e) =>
                    updateField(
                      "type",
                      e.target.value as AccountWizardData["type"],
                    )
                  }
                  className="w-full bg-transparent rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 focus:border-[#7D152D] transition-colors appearance-none cursor-pointer"
                  style={{ fontSize: "0.875rem" }}
                >
                  <option value="">Select type</option>
                  <option value="on-premise">On-Premise</option>
                  <option value="off-premise">Off-Premise</option>
                </select>
                <FieldError field="type" />
              </div>

              {/* Venue Sub-Type */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Venue Sub-Type <span className="text-destructive">*</span>
                </label>
                <select
                  value={data.venueSubType}
                  onChange={(e) => updateField("venueSubType", e.target.value)}
                  className="w-full bg-transparent rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 focus:border-[#7D152D] transition-colors appearance-none cursor-pointer"
                  style={{ fontSize: "0.875rem" }}
                >
                  <option value="">Select venue sub-type</option>
                  {VENUE_SUB_TYPES.map((vt) => (
                    <option key={vt} value={vt}>
                      {vt.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>
                <FieldError field="venueSubType" />
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Status <span className="text-destructive">*</span>
                </label>
                <select
                  value={data.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value as AccountWizardData["status"],
                    )
                  }
                  className="w-full bg-transparent rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 focus:border-[#7D152D] transition-colors appearance-none cursor-pointer"
                  style={{ fontSize: "0.875rem" }}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="prospect">Prospect</option>
                </select>
                <FieldError field="status" />
              </div>

              {/* Chain (optional) */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Chain{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  type="text"
                  value={data.chain}
                  onChange={(e) => updateField("chain", e.target.value)}
                  placeholder="e.g. Total Wine, Whole Foods"
                />
              </div>
            </>
          )}

          {/* ---- STEP 2: Location & Contact ---- */}
          {step === 2 && (
            <>
              {/* Address */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Address <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={data.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="123 Main St"
                  aria-invalid={!!errors.address}
                />
                <FieldError field="address" />
              </div>

              {/* City + State */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    className="block text-foreground"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    City <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    value={data.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="New York"
                    aria-invalid={!!errors.city}
                  />
                  <FieldError field="city" />
                </div>
                <div className="space-y-1.5">
                  <label
                    className="block text-foreground"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    State <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={data.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className="w-full bg-transparent rounded-lg border border-border px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-[#7D152D]/30 focus:border-[#7D152D] transition-colors appearance-none cursor-pointer"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <option value="">Select state</option>
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <FieldError field="state" />
                </div>
              </div>

              {/* Zip Code */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Zip Code <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={data.zipCode}
                  onChange={(e) => updateField("zipCode", e.target.value)}
                  placeholder="10001"
                  aria-invalid={!!errors.zipCode}
                />
                <FieldError field="zipCode" />
              </div>

              {/* Contact Name */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Contact Name <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={data.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  placeholder="Full name"
                  aria-invalid={!!errors.contactName}
                />
                <FieldError field="contactName" />
              </div>

              {/* Contact Phone */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Contact Phone <span className="text-destructive">*</span>
                </label>
                <Input
                  type="tel"
                  value={data.contactPhone}
                  onChange={(e) => updateField("contactPhone", e.target.value)}
                  placeholder="(212) 555-0100"
                  aria-invalid={!!errors.contactPhone}
                />
                <FieldError field="contactPhone" />
              </div>

              {/* Contact Email (optional) */}
              <div className="space-y-1.5">
                <label
                  className="block text-foreground"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Contact Email{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  type="email"
                  value={data.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                  placeholder="contact@venue.com"
                  aria-invalid={!!errors.contactEmail}
                />
                <FieldError field="contactEmail" />
              </div>
            </>
          )}

          {/* ---- STEP 3: Review ---- */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border divide-y divide-border">
                {/* Venue Details */}
                <div className="p-4 space-y-3">
                  <p
                    className="text-muted-foreground uppercase tracking-wider"
                    style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                  >
                    Venue Details
                  </p>
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 gap-x-4">
                    <ReviewRow label="Account" value={data.accountName} />
                    <ReviewRow
                      label="Type"
                      value={data.type === "on-premise" ? "On-Premise" : "Off-Premise"}
                    />
                    <ReviewRow
                      label="Venue Sub-Type"
                      value={data.venueSubType
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    />
                    <ReviewRow
                      label="Status"
                      value={data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                    />
                    {data.chain && <ReviewRow label="Chain" value={data.chain} />}
                  </div>
                </div>

                {/* Location & Contact */}
                <div className="p-4 space-y-3">
                  <p
                    className="text-muted-foreground uppercase tracking-wider"
                    style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                  >
                    Location & Contact
                  </p>
                  <div className="grid grid-cols-[120px_1fr] gap-y-2 gap-x-4">
                    <ReviewRow
                      label="Address"
                      value={`${data.address}, ${data.city}, ${data.state} ${data.zipCode}`}
                    />
                    <ReviewRow label="Contact" value={data.contactName} />
                    <ReviewRow label="Phone" value={data.contactPhone} />
                    {data.contactEmail && (
                      <ReviewRow label="Email" value={data.contactEmail} />
                    )}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "0.75rem" }}
                >
                  Clicking <strong>Create Account</strong> will add this venue
                  to the Account Master.
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
              Create Account
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Review Row helper                                                    */
/* ------------------------------------------------------------------ */

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span
        className="text-muted-foreground"
        style={{ fontSize: "0.8125rem" }}
      >
        {label}
      </span>
      <span
        className="text-foreground"
        style={{ fontSize: "0.8125rem", fontWeight: 500 }}
      >
        {value}
      </span>
    </>
  );
}
