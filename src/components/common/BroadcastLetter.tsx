import { X, Send, FileText, Paperclip } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

interface ComposeLetterProps {
  onClose: () => void;
}

function BroadcastLetter({ onClose }: ComposeLetterProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        ref={popupRef}
        className="w-[560px] bg-card rounded-xl shadow-xl overflow-hidden border border-border"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-teal-700 dark:text-teal-400" />
            <h1 className="font-semibold text-foreground text-base">
              {t("Broadcast Letter")}
            </h1>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">
              {t("Subject")}
            </Label>
            <Input
              placeholder="Brief title of the letter"
              className="border-border focus:border-teal-600 focus:ring-teal-600 text-sm"
            />
          </div>


          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">
              {t("Letter type")}
            </Label>
            <select className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600">
              <option>General request</option>
              <option>Open a university</option>
              <option>Close a university</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <Label className="text-sm font-medium text-foreground">
                {t("Recipent universities")}
              </Label>
              <button
          {/* letter content */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">
              {t("Letter content")}
            </Label>
            <textarea
              placeholder="Write the full request..."
              rows={4}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* attach file */}
        <div
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 ml-6 mb-3 px-3 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-500/10 transition-colors w-fit"
        >
          <Paperclip size={15} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{t("Attach file")}</span>
          <input ref={inputRef} type="file" className="hidden" />
        </div>

        {/* buttons */}
        <div className="flex justify-end items-center gap-2 px-6 py-4 bg-muted/40 border-t border-border">
          <Button
            onClick={onClose}
            variant="outline"
            className="text-sm text-muted-foreground border-border hover:bg-muted hover:text-foreground"
          >
            {t("Cancel")}
          </Button>
          <Button className="text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-2 cursor-pointer">
            <Send size={14} />
            {t("Send Broadcast")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BroadcastLetter;
