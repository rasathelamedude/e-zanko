import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { FileText, Paperclip, Send, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { broadcastLetter } from "../../api/letters";
import { notifySuccess } from "../../lib/notify";

interface BroadcastLetterProp {
  onClose: () => void;
}

function BroadcastLetter({ onClose }: BroadcastLetterProp) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  const { mutate: sendBroadcast, isPending } = useMutation({
    mutationFn: broadcastLetter,
    onSuccess: () => {
      notifySuccess(t("Broadcast letter sent."));
      onClose();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  function handleSend() {
    if (!title.trim() || !body.trim()) return;
    sendBroadcast({ title, body, files });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        ref={popupRef}
        className="w-140 bg-card rounded-xl shadow-xl overflow-hidden border border-border"
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
          {/* title */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">
              {t("Subject")}
            </Label>
            <Input
              placeholder={t("Brief title of the letter")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border focus:border-teal-600 focus:ring-teal-600 text-sm"
            />
          </div>

          {/* body */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-foreground">
              {t("Letter content")}
            </Label>
            <textarea
              placeholder={t("Write the full request...")}
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* files */}
        <div className="px-6 mb-3 flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">
            {t("Optional")}
          </Label>
          <div
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-500/10 transition-colors w-fit"
          >
            <Paperclip size={15} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {t("Attach file")}
            </span>
            <input
              ref={inputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <ul className="flex flex-col gap-1">
              {files.map((file, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-sm text-foreground bg-muted/40 rounded-md px-3 py-1.5"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-muted-foreground hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
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
          <Button
            onClick={handleSend}
            disabled={isPending}
            className="text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center gap-2"
          >
            <Send size={14} />
            {isPending ? t("Sending...") : t("Send Broadcast")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BroadcastLetter;
