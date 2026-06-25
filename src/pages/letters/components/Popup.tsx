import { Button } from "../../../components/ui/button";
import { type ReactNode } from "react";

interface PopupProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children?: ReactNode;
  cancelLabel?: string;
  confirmLabel: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
}

function Popup({
  icon,
  title,
  subtitle,
  children,
  cancelLabel = "Cancel",
  confirmLabel,
  onCancel,
  onConfirm,
  confirmDisabled,
}: PopupProps) {
  return (
    <div className="bg-white shadow-md px-6 py-8 rounded-xl">
      <div className="flex items-center">
        <div className="bg-teal-50 rounded-2xl p-3">{icon}</div>
        <div className="ml-3">
          <p className="font-bold text-xl">{title}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      {children && <div className="my-4">{children}</div>}

      <div className="flex gap-2 mt-4">
        <Button
          onClick={onCancel}
          className="bg-white border-teal-700 text-gray-800 hover:bg-white"
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={confirmDisabled}
          className="bg-teal-700 text-white rounded-lg hover:bg-teal-800"
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}

export default Popup;
