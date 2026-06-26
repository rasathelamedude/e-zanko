import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Ban, CircleOff, LayoutDashboard } from "lucide-react";

export default function ForbiddenPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F0EEE8] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full border border-black/[0.04]" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[360px] w-[360px] rounded-full border border-black/[0.03]" />
      </div>

      <main className="relative z-10 flex w-full max-w-[420px] flex-col items-center rounded-[20px] border border-black/[0.08] bg-[#FAFAF8] px-10 py-10 text-center shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
        <span className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-amber-600/[0.18] bg-amber-600/[0.08] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#B45309]">
          <Ban size={11} strokeWidth={2.5} />
          {t("403 — Forbidden")}
        </span>

        <div className="relative mb-7 flex items-center justify-center">
          <div className="z-10 flex h-[82px] w-[82px] items-center justify-center rounded-full border border-black/[0.09] bg-black/[0.04]">
            <CircleOff size={34} strokeWidth={1.8} className="text-[#1A1A1A]" />
          </div>

          <span
            aria-hidden
            className="absolute -end-7 -bottom-2 select-none font-mono text-[5.5rem] font-extrabold leading-none tracking-tighter text-black/[0.055]"
          >
            403
          </span>
        </div>

        <h1 className="mb-3 text-[1.4rem] font-semibold leading-snug tracking-tight text-[#111]">
          {t("Access Forbidden")}
        </h1>

        <p className="max-w-[300px] text-sm leading-relaxed text-[#7A7A72]">
          {t(
            "This page is strictly off-limits. You lack the necessary permissions to enter this area — no exceptions.",
          )}
        </p>

        <div className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] border border-black/[0.07] bg-black/[0.03] px-4 py-2">
          <span className="whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#AEADA6]">
            {t("Status")}
          </span>

          <code className="rounded bg-black/[0.05] px-2 py-0.5 font-mono text-[0.78rem] text-[#444]">
            {t("403 Forbidden")}
          </code>
        </div>

        <div className="my-7 h-px w-full bg-black/[0.07]" />

        <button
          onClick={() => navigate("/")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] px-5 py-3 text-sm font-medium text-[#F0EEE8] transition-all duration-150 hover:-translate-y-px hover:bg-[#2C2C2C] active:translate-y-0"
        >
          <LayoutDashboard size={16} strokeWidth={2} />
          {t("Go to Dashboard")}
        </button>
      </main>
    </div>
  );
}
