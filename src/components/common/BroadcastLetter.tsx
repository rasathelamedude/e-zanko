import { X, Send, FileText, Paperclip } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

interface ComposeLetterProps {
  onClose: () => void;
}

const recipentUniversities = [
  { label: "University of Salahaddin", value: 18 },
  { label: "University of Sulaimani", value: 15 },
  { label: "University of Duhok", value: 12 },
  { label: "University of Halabja", value: 11 },
  { label: "University of Garmian", value: 9 },
  { label: "University of Raparin", value: 8 },
];

function BroadcastLetter({ onClose }: ComposeLetterProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div
        ref={popupRef}
        className="w-[560px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-teal-700" />
            <h1 className="font-semibold text-gray-800 text-base">
              {t("Broadcast Letter")}
            </h1>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">
              {t("Subject")}
            </Label>
            <Input
              placeholder="Brief title of the letter"
              className="border-gray-200 focus:border-teal-600 focus:ring-teal-600 text-sm"
            />
          </div>

          {/* letter type */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">
              {t("Letter type")}
            </Label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600">
              <option>General request</option>
              <option>Open a university</option>
              <option>Close a university</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <Label className="text-sm font-medium text-gray-700">
                {t("Recipent universities")}
              </Label>
              <button
                type="button"
                onClick={() =>
                  setSelectedRecipients(
                    recipentUniversities.map((r) => r.value),
                  )
                }
                className="text-sm font-semibold text-teal-600 hover:text-teal-700"
              >
                {t("Select All")}
              </button>
            </div>
            <div className="border-1 border-gray-200 rounded-md p-2">
              {recipentUniversities.map((recipent) => (
                <label
                  key={recipent.value}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={recipent.value}
                    checked={selectedRecipients.includes(recipent.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRecipients((prev) => [
                          ...prev,
                          recipent.value,
                        ]);
                      } else {
                        setSelectedRecipients((prev) =>
                          prev.filter((v) => v !== recipent.value),
                        );
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                  />
                  <span className="text-sm text-gray-700">
                    {recipent.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* letter content */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-gray-700">
              {t("Letter content")}
            </Label>
            <textarea
              placeholder="Write the full request..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* attach file */}
        <div
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 ml-6 mb-3 px-3 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-50 transition-colors w-fit"
        >
          <Paperclip size={15} className="text-gray-400" />
          <span className="text-sm text-gray-500">{t("Attach file")}</span>
          <input ref={inputRef} type="file" className="hidden" />
        </div>

        {/* buttons */}
        <div className="flex justify-end items-center gap-2 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <Button
            onClick={onClose}
            variant="outline"
            className="text-sm text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-800"
          >
            {t("Cancel")}
          </Button>
          <Button className="text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-2">
            <Send size={14} />
            {t("Send Broadcast")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BroadcastLetter;
