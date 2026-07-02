import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";
import { easeOutExpo } from "../../lib/motion";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

function ConfirmDialog({
  title,
  description,
  onConfirm,
  onClose,
  isLoading = false,
}: ConfirmDialogProps) {
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
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: -24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
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
            className="h-9 bg-red-600 px-4 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? t("Deleting...") : t("Delete")}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ConfirmDialog;