import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, X, Check, MapPin } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/shared/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/shared/components/ui/command";
import { MOCK_ACCOUNTS } from "@/lib/account-data";

function formatLocation(account: (typeof MOCK_ACCOUNTS)[number]): string {
  return `${account.name}, ${account.city} ${account.state}`;
}

interface LocationComboboxProps {
  value: string;
  accountId: string;
  onSelect: (location: string, accountId: string) => void;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export function LocationCombobox({
  value,
  accountId,
  onSelect,
  className,
  style,
}: LocationComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Reset search when popover closes
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  function handleSelect(account: (typeof MOCK_ACCOUNTS)[number]) {
    onSelect(formatLocation(account), account.id);
    setOpen(false);
  }

  function handleFreeText() {
    if (search.trim()) {
      onSelect(search.trim(), "");
      setOpen(false);
    }
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onSelect("", "");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          className={`${className ?? ""} flex items-center justify-between text-left`}
          style={style}
        >
          <span
            className={value ? "text-[#0F172A] truncate" : "text-[#94A3B8] truncate"}
            style={{ fontSize: "0.9375rem" }}
          >
            {value || "Search accounts or enter location..."}
          </span>
          <span className="flex items-center gap-1 shrink-0 ml-2">
            {value && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleClear(e as unknown as React.MouseEvent);
                }}
                className="hover:bg-[#F1F5F9] rounded p-0.5 transition-colors"
              >
                <X size={14} style={{ color: "#94A3B8" }} />
              </span>
            )}
            <ChevronsUpDown size={14} style={{ color: "#94A3B8" }} />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: triggerRef.current?.offsetWidth ?? 400 }}
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command shouldFilter>
          <CommandInput
            placeholder="Search by name, address, city..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              <div className="text-[#94A3B8]" style={{ fontSize: "0.8125rem" }}>
                No matching accounts
              </div>
            </CommandEmpty>
            <CommandGroup heading="Account Master">
              {MOCK_ACCOUNTS.map((account) => (
                <CommandItem
                  key={account.id}
                  value={`${account.name} ${account.address} ${account.city} ${account.state} ${account.zipCode}`}
                  onSelect={() => handleSelect(account)}
                  className="flex items-start gap-2 py-2 cursor-pointer"
                >
                  <Check
                    size={14}
                    className={`mt-0.5 shrink-0 ${accountId === account.id ? "opacity-100" : "opacity-0"}`}
                    style={{ color: "#7D152D" }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-medium truncate"
                        style={{ fontSize: "0.875rem", color: "#0F172A" }}
                      >
                        {account.name}
                      </span>
                      <span
                        className="shrink-0 rounded px-1.5 py-0.5"
                        style={{
                          fontSize: "0.6875rem",
                          background:
                            account.type === "on-premise"
                              ? "#DBEAFE"
                              : "#F0FDF4",
                          color:
                            account.type === "on-premise"
                              ? "#1E40AF"
                              : "#166534",
                        }}
                      >
                        {account.type === "on-premise"
                          ? "On-Premise"
                          : "Off-Premise"}
                      </span>
                    </div>
                    <div
                      className="truncate"
                      style={{ fontSize: "0.8125rem", color: "#94A3B8" }}
                    >
                      {account.address}, {account.city}, {account.state}{" "}
                      {account.zipCode}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {search.trim() && (
              <CommandGroup heading="Custom">
                <CommandItem
                  value={`__freetext__${search}`}
                  onSelect={handleFreeText}
                  className="flex items-center gap-2 py-2 cursor-pointer"
                >
                  <MapPin
                    size={14}
                    className="shrink-0"
                    style={{ color: "#94A3B8" }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "#0F172A" }}>
                    Use &ldquo;{search.trim()}&rdquo; as custom location
                  </span>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
