import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { Letter } from "../../../types/letter";
import { Check, X, MoveUp, Forward, Zap, ChevronDown } from "lucide-react";
import Popup from "./Popup";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

const statusStyles: Record<string, string> = {
  pending:
    "bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/15",
  approved:
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
  rejected:
    "bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/15",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

type ActionType = "approve" | "reject" | "forward" | "raise" | null;

interface LetterDetailsProps {
  letter: Letter;
}

function LetterDetails({ letter }: LetterDetailsProps) {
  const { t } = useTranslation();
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closePopup() {
    setActiveAction(null);
  }

  function handleConfirm() {
    // action logic here
    closePopup();
  }

  return (
    <div className="border border-border rounded-xl p-6 bg-card h-full">
      {/* badge, date, actions */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge className={statusStyles[letter.status]}>
            {t(statusLabels[letter.status])}
          </Badge>
          <span className="text-xs text-muted-foreground">{letter.date}</span>
        </div>

        {letter.status === "pending" && (
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="bg-teal-700 text-white hover:bg-teal-800 flex items-center gap-1"
            >
              {t("Actions")} <ChevronDown className="w-4 h-4" />
            </Button>

            {/* dropdown buttons */}
            {dropdownOpen && (
              <div className="absolute inset-e-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-md z-10 overflow-hidden">
                <button
                  onClick={() => {
                    setActiveAction("approve");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  <Check className="w-4 h-4 text-teal-700 dark:text-teal-400" />{" "}
                  {t("Approve")}
                </button>
                <button
                  onClick={() => {
                    setActiveAction("reject");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  <X className="w-4 h-4 text-red-500 dark:text-red-400" />{" "}
                  {t("Reject")}
                </button>
                <button
                  onClick={() => {
                    setActiveAction("forward");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  <Forward className="w-4 h-4 text-muted-foreground" />{" "}
                  {t("Forward")}
                </button>
                <button
                  onClick={() => {
                    setActiveAction("raise");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                >
                  <MoveUp className="w-4 h-4 text-muted-foreground" />{" "}
                  {t("Sign & Raise")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* title */}
      <h1 className="text-2xl font-bold text-foreground mb-6">{letter.title}</h1>

      {/* sender */}
      <div className="pb-4 mb-4 border-b border-border">
        <p className="text-xs text-muted-foreground mb-1">{t("Sender")}</p>
        <p className="text-sm font-semibold text-foreground">
          {letter.university}
        </p>
      </div>

      {/* message */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">{t("Message")}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {letter.message}
        </p>
      </div>

      {/* popup based on action */}
      {activeAction && (
        <div
          onClick={closePopup}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          {activeAction === "approve" && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                icon={<Check className="text-teal-700 dark:text-teal-400" />}
                title={t("Approve Letter")}
                subtitle={letter.title}
                confirmLabel={t("Sign and Approve")}
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <p className="text-muted-foreground text-sm my-3">
                  {t("You are signing and approving")}{" "}
                  <span className="font-bold text-foreground">
                    {letter.title}
                  </span>{" "}
                  {t("from")}{" "}
                  <span className="font-bold text-foreground">
                    {letter.university}
                  </span>
                </p>
                <p className="flex gap-3 bg-teal-500/10 p-3 rounded-lg">
                  <Zap className="text-teal-700 dark:text-teal-400" />
                  {t("On approval: Faculty archived")}
                </p>

                <Label className="text-sm font-medium text-foreground mt-3">
                  {t("Enter your full name to sign")}
                </Label>
                <Input placeholder={t("Your full name")} type="text" />

                <p className="text-sm text-muted-foreground mt-5">
                  {t(
                    "Your typed name becomes the official signature on this letter.",
                  )}
                </p>
              </Popup>
            </div>
          )}

          {activeAction === "reject" && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                icon={<X className="text-red-600 dark:text-red-400" />}
                title={t("Reject Letter")}
                subtitle={letter.title}
                confirmLabel={t("Confirm rejection")}
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <p className="text-muted-foreground text-sm my-3">
                  {t("You are rejecting")}{" "}
                  <span className="font-bold text-foreground">
                    {letter.title}
                  </span>{" "}
                  {t("from")}{" "}
                  <span className="font-bold text-foreground">
                    {letter.university}
                  </span>
                </p>
                <Label className="text-sm font-medium text-foreground">
                  {t("Rejection reason (optional)")}
                </Label>
                <textarea
                  className="w-full border rounded-md p-2 mt-1"
                  rows={2}
                />
                <Label className="text-sm font-medium text-foreground">
                  {t("Enter your full name to confirm")}
                </Label>
                <Input placeholder={t("Your full name")} type="text" />
              </Popup>
            </div>
          )}

          {activeAction === "forward" && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                icon={<Forward className="text-amber-600" />}
                title={t("Forward Letter")}
                subtitle={t(
                  "Forward this letter to a colleague or a higher office - no signature added",
                )}
                confirmLabel={t("Forward")}
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <Label className="text-sm font-medium text-foreground">
                  {t("Forward to")}
                </Label>
                <select className="w-full border rounded-md p-2 mt-1">
                  <option>{t("Dean's Office")}</option>
                  <option>{t("Registrar")}</option>
                </select>
              </Popup>
            </div>
          )}

          {activeAction === "raise" && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                icon={<MoveUp className="text-indigo-700" />}
                title={t("Sign & Raise")}
                subtitle={t(
                  "Sign this letter and raise it to a higher office for further actions",
                )}
                confirmLabel={t("Sign and Raise")}
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      {t("Enter your full name to sign")}
                    </Label>
                    <Input placeholder={t("e.g. Dr. Aram Mahmoud")} />
                  </div>

                  <Label className="text-sm font-medium text-foreground">
                    {t("Raise to")}
                  </Label>
                  <select className="w-full border rounded-md p-2 mt-1">
                    <option>{t("Dean's Office")}</option>
                    <option>{t("Registrar")}</option>
                  </select>
                  <p className="text-muted-foreground font-semibold">
                    {t("Sign and Raise")}
                  </p>
                </div>
              </Popup>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LetterDetails;
