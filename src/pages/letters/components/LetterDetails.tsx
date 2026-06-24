import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { Letter } from "../../../types/letter";
import { Check, X, MoveUp, Forward } from "lucide-react";

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
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge className={statusStyles[letter.status]}>
            {statusLabels[letter.status]}
          </Badge>
          <span className="text-xs text-gray-400">{letter.date}</span>
        </div>

        {/* buttons */}
        {letter.status === "pending" && (
          <div className="flex items-end gap-2">
            <Button className="bg-teal-700 text-white rounded-lg hover:bg-teal-800">
              <Check className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button className="bg-amber-500 text-white hover:bg-amber-600 shadow-sm">
              <Forward className="w-4 h-4 mr-1" /> Forward
            </Button>
            <Button className="border-2 border-red-500 bg-white text-red-600 hover:bg-red-50">
              <X className="w-4 h-4 mr-1" /> Reject
            </Button>
            <Button className="border-2 border-indigo-600 bg-white text-indigo-700 hover:bg-indigo-50">
              <MoveUp className="w-4 h-4 mr-1" /> Sign & Raise
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
