import { useEffect, useRef, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { Letter } from "../../../types/letter";
import { Check, X, MoveUp, Forward, Zap, ChevronDown } from "lucide-react";
import Popup from "./Popup";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  approved: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100",
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
    <div className="border border-gray-200 rounded-xl p-6 bg-white h-full">
      {/* badge, date, actions */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge className={statusStyles[letter.status]}>
            {statusLabels[letter.status]}
          </Badge>
          <span className="text-xs text-gray-400">{letter.date}</span>
        </div>

        {letter.status === "pending" && (
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="bg-teal-700 text-white hover:bg-teal-800 flex items-center gap-1"
            >
              Actions <ChevronDown className="w-4 h-4" />
            </Button>

            {/* dropdown buttons */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10 overflow-hidden">
                <button
                  onClick={() => {
                    setActiveAction("approve");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Check className="w-4 h-4 text-teal-700" /> Approve
                </button>
                <button
                  onClick={() => {
                    setActiveAction("reject");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 text-red-500" /> Reject
                </button>
                <button
                  onClick={() => {
                    setActiveAction("forward");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Forward className="w-4 h-4 text-gray-500" /> Forward
                </button>
                <button
                  onClick={() => {
                    setActiveAction("raise");
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <MoveUp className="w-4 h-4 text-gray-500" /> Sign & Raise
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{letter.title}</h1>

      {/* sender */}
      <div className="pb-4 mb-4 border-b border-gray-100">
        <p className="text-xs text-gray-400 mb-1">Sender</p>
        <p className="text-sm font-semibold text-gray-800">
          {letter.university}
        </p>
      </div>

      {/* message */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Message</p>
        <p className="text-sm text-gray-700 leading-relaxed">
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
                icon={<Check className="text-teal-700" />}
                title="Approve Letter"
                subtitle={letter.title}
                confirmLabel="Sign and Approve"
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <p className="text-gray-600 text-sm my-3">
                  You are signing and approving{" "}
                  <span className="font-bold text-black">{letter.title}</span>{" "}
                  from{" "}
                  <span className="font-bold text-black">
                    {letter.university}
                  </span>
                </p>
                <p className="flex  gap-3 bg-teal-50 p-3 rounded-lg">
                  <Zap className="text-teal-700" />
                  On approval: Faculty archived
                </p>

                <Label className="text-sm font-medium text-gray-700 mt-3">
                  Enter your full name to sign
                </Label>
                <Input placeholder="Your full name" type="text" />

                <p className="text-sm text-gray-500 mt-5">
                  Your typed name becomes the official signature on this letter.
                </p>
              </Popup>
            </div>
          )}
          {activeAction === "reject" && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                icon={<X className="text-red-600" />}
                title="Reject Letter"
                subtitle={letter.title}
                confirmLabel="Confirm rejection"
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <p className="text-gray-600 text-sm my-3">
                  You are rejecting{" "}
                  <span className="font-bold text-black">{letter.title}</span>{" "}
                  from{" "}
                  <span className="font-bold text-black">
                    {letter.university}
                  </span>
                </p>
                <Label className="text-sm font-medium text-gray-700">
                  Rejection reason (optional)
                </Label>
                <textarea
                  className="w-full border rounded-md p-2 mt-1"
                  rows={2}
                />
                <Label className="text-sm font-medium text-gray-700">
                  Enter your full name to confirm
                </Label>
                <Input placeholder="Your full name" type="text" />
              </Popup>
            </div>
          )}

          {activeAction === "forward" && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                icon={<Forward className="text-amber-600" />}
                title="Forward Letter"
                subtitle="Forward this letter to a colleague or a higher office - no signature added"
                confirmLabel="Forward"
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <label className="text-sm font-medium text-gray-700">
                  Forward to
                </label>
                <select className="w-full border rounded-md p-2 mt-1">
                  <option>Dean's Office</option>
                  <option>Registrar</option>
                </select>
              </Popup>
            </div>
          )}

          {activeAction === "raise" && (
            <div onClick={(e) => e.stopPropagation()}>
              <Popup
                icon={<MoveUp className="text-indigo-700" />}
                title="Sign & Raise"
                subtitle="Sign this letter and raise it to a higher office for further actions"
                confirmLabel="Sign and Raise"
                onCancel={closePopup}
                onConfirm={handleConfirm}
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Enter your full name to sign
                    </Label>
                    <Input placeholder="e.g. Dr. Aram Mahmoud" />
                  </div>
                  <p className="text-gray-500 font-semibold">Sign and Raise</p>
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
