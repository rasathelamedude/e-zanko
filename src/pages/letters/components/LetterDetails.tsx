import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { Letter } from "../../../types/letter";
import { Check, X, Forward } from "lucide-react";

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

interface LetterDetailsProps {
  letter: Letter;
}

function LetterDetails({ letter }: LetterDetailsProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white h-full">
      {/* badge, date, actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge className={statusStyles[letter.status]}>
            {statusLabels[letter.status]}
          </Badge>
          <span className="text-xs text-gray-400">{letter.date}</span>
        </div>
        {letter.status === "pending" && (
          <div className="flex gap-2">
            <Button className="bg-teal-700 text-white hover:bg-teal-800">
              <Check className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button className="border border-amber-500 bg-white text-amber-500 hover:bg-amber-50">
              <Forward className="w-4 h-4 mr-1" /> Forward
            </Button>
            <Button className="border border-red-500 bg-white text-red-500 hover:bg-red-50">
              <X className="w-4 h-4 mr-1" /> Reject
            </Button>
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
    </div>
  );
}

export default LetterDetails;
