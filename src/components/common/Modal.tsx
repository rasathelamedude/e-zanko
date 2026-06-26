import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

interface ModalProps {
  title: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({
  title,
  confirmLabel,
  onConfirm,
  onClose,
  children,
}: ModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="my-2">{children}</div>
        <div className="flex justify-end gap-5 p-4">
          <Button
            onClick={onClose}
            className="bg-white border-teal-700 text-gray-800 hover:bg-white"
          >
            {t("Cancel")}
          </Button>
          <Button onClick={onConfirm} className="bg-teal-700 text-white">
            {confirmLabel ?? t("Confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
