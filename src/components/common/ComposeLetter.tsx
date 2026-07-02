import { X, Send, FileText, Paperclip } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { composeLetter } from "../../api/letters";
import type {
  ComposeLetterPayload,
  LetterActionOption,
  LetterActionType,
  LetterPayloadValues,
} from "../../types/letter";
import { useUserStore } from "../../store/userStore";
import { notifyError, notifySuccess } from "../../lib/notify";
import LetterPayloadFields from "./LetterPayloadFields";

interface ComposeLetterProps {
  onClose: () => void;
}

interface ComposeLetterFormState {
  title: string;
  body: string;
  type: LetterActionType;
  receiver_id: number;
  academic_year_id: number;
  payload: LetterPayloadValues;
}

function ComposeLetter({ onClose }: ComposeLetterProps) {
  const { t } = useTranslation();
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ComposeLetterFormState>({
    title: "",
    body: "",
    type: "hire_teacher",
    receiver_id: 4,
    academic_year_id: 1,
    payload: {},
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const userRole = user?.roles?.[0]?.name;
  const userScopeType = user?.scopes?.[0]?.scope_type;

  const availableActions = useMemo(() => {
    const roleActions: Record<string, LetterActionOption[]> = {
      DEPARTMENT_HEAD: [
        { value: "hire_teacher", label: t("Hire a Lecturer") },
        { value: "fire_teacher", label: t("Fire a Lecturer") },
      ],
      FACULTY_ADMIN: [
        { value: "create_department", label: t("Create a Department") },
        { value: "close_department", label: t("Close a Department") },
      ],
      UNIVERSITY_ADMIN: [
        { value: "open_faculty", label: t("Open a Faculty") },
        { value: "close_faculty", label: t("Close a Faculty") },
      ],
    };

    if (roleActions[userRole ?? ""]?.length) {
      return roleActions[userRole ?? ""];
    }

    if (userScopeType === "DEPARTMENT") return roleActions.DEPARTMENT_HEAD;
    if (userScopeType === "FACULTY") return roleActions.FACULTY_ADMIN;
    if (userScopeType === "UNIVERSITY") return roleActions.UNIVERSITY_ADMIN;

    return [];
  }, [t, userRole, userScopeType]);

  const activeActionType = availableActions.some(
    (action) => action.value === form.type,
  )
    ? form.type
    : ((availableActions[0]?.value as LetterActionType | undefined) ??
      "hire_teacher");

  const { mutate: sendLetter, isPending } = useMutation({
    mutationFn: (payload: ComposeLetterPayload) => composeLetter(payload),
    onSuccess: () => {
      notifySuccess(t("Letter sent successfully."));
      queryClient.invalidateQueries({ queryKey: ["outboxLetters"] });
      onClose();
    },
    onError: (error) => {
      notifyError(error, t("Could not send letter."));
    },
  });

  const handleSubmit = () => {
    if (!form.title.trim() || !form.body.trim()) {
      notifyError(undefined, t("Please fill in the subject and content."));
      return;
    }

    if (!user?.id) {
      notifyError(undefined, t("You need to be signed in to send a letter."));
      return;
    }

    const requiredFields = {
      hire_teacher: ["name", "email", "phone", "title", "speciality"],
      fire_teacher: ["name", "email", "reason"],
      create_department: ["name", "faculty_id", "head_name", "code"],
      close_department: ["name", "faculty_id", "reason"],
      open_faculty: ["name", "dean_name", "university_id"],
      close_faculty: ["name", "university_id", "reason"],
    } as const;

    const missingFields = requiredFields[form.type]?.some(
      (field) => !String(form.payload[field] ?? "").trim(),
    );

    if (missingFields) {
      notifyError(undefined, t("Please complete all required details."));
      return;
    }

    const payload: ComposeLetterPayload = {
      type: form.type,
      original_sender_id: user.id,
      title: form.title,
      body: form.body,
      receiver_id: form.receiver_id,
      academic_year_id: form.academic_year_id,
      payload: {
        ...form.payload,
        ...(form.type === "hire_teacher" || form.type === "fire_teacher"
          ? {
              department_id:
                user.scopes?.find((scope) => scope.scope_type === "DEPARTMENT")
                  ?.scope_id ??
                user.scopes?.[0]?.scope_id ??
                null,
            }
          : {}),
      },
    };

    sendLetter(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={popupRef}
        className="flex max-h-[90vh] w-156 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-teal-700 dark:text-teal-400" />
            <h1 className="text-base font-semibold text-foreground">
              {t("Compose Letter")}
            </h1>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                {t("Subject")}
              </Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder={t("Brief title of the letter")}
                className="border-border text-sm focus:border-teal-600 focus:ring-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t("Letter type")}
                </Label>
                <select
                  value={activeActionType}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      type: e.target.value as LetterActionType,
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  {availableActions.length > 0 ? (
                    availableActions.map((action) => (
                      <option key={action.value} value={action.value}>
                        {action.label}
                      </option>
                    ))
                  ) : (
                    <option value="hire_teacher">{t("Hire a lecturer")}</option>
                  )}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-foreground">
                  {t("Recipient")}
                </Label>
                <select
                  value={form.receiver_id}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      receiver_id: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value={2}>{t("University president")}</option>
                  <option value={4}>
                    {t("Dean of College of Engineering")}
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">
                {t("Letter content")}
              </Label>
              <textarea
                value={form.body}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, body: e.target.value }))
                }
                placeholder={t("Write the full request...")}
                rows={4}
                className="w-full resize-none rounded-lg border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <LetterPayloadFields
              action={activeActionType}
              values={form.payload}
              onChange={(field, value) =>
                setForm((prev) => ({
                  ...prev,
                  payload: { ...prev.payload, [field]: value },
                }))
              }
              departmentId={user?.scopes?.[0]?.scope_id ?? null}
            />
          </div>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="ms-6 mb-3 flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 transition-colors hover:border-teal-600 hover:bg-teal-500/10"
        >
          <Paperclip size={15} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {t("Attach file")}
          </span>
          <input ref={inputRef} type="file" className="hidden" />
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/40 px-6 py-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-border text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {t("Cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex items-center gap-2 bg-teal-700 text-sm text-white hover:bg-teal-800"
          >
            <Send size={14} />
            {t("Send letter")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ComposeLetter;
