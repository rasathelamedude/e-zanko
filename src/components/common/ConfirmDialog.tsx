import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {t("Cancel")}
          </Button>
          <Button
            disabled={isLoading}
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? t("Deleting...") : t("Delete")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;