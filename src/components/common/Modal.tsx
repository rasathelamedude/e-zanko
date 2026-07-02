import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { easeOutExpo } from "../../lib/motion";

type ModalSize = "md" | "lg" | "xl";

interface ModalProps {
  title: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onClose: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  size?: ModalSize;
}

const sizeClass: Record<ModalSize, string> = {
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

function Modal({
  title,
  confirmLabel,
  onConfirm,
  onClose,
  children,
  isLoading = false,
  size = "md",
}: ModalProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className={`flex max-h-[88vh] w-full ${sizeClass[size]} flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={onClose}
            className="h-9 px-4"
          >
            {t("Cancel")}
          </Button>
          <Button
            disabled={isLoading}
            onClick={onConfirm}
            className="h-9 bg-teal-600 px-4 text-white hover:bg-teal-700"
          >
            {isLoading ? t("Saving...") : (confirmLabel ?? t("Confirm"))}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
