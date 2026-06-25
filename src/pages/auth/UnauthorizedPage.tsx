import { useNavigate } from "react-router-dom";
import { LockKeyhole, ShieldOff, LayoutDashboard } from "lucide-react";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#F0EEE8] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Ambient rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-150 h-150 rounded-full border border-black/4" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-90 h-90 rounded-full border border-black/3" />
      </div>

      {/* Card */}
      <main className="relative z-10 w-full max-w-105 bg-[#FAFAF8] border border-black/8 rounded-[20px] px-10 py-10 flex flex-col items-center text-center shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 bg-red-600/8 border border-red-600/18 text-[#B94035] text-[0.65rem] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-8">
          <ShieldOff size={11} strokeWidth={2.5} />
          403 — Unauthorized
        </span>

        {/* Icon + ghost 403 */}
        <div className="relative flex items-center justify-center mb-7">
          <div className="w-20.5 h-20.5 rounded-full bg-black/4 border border-black/9 flex items-center justify-center z-10">
            <LockKeyhole
              size={34}
              strokeWidth={1.8}
              className="text-[#1A1A1A]"
            />
          </div>
          <span
            aria-hidden
            className="absolute -right-7 -bottom-2 text-[5.5rem] font-extrabold text-black/5.5 leading-none select-none tracking-tighter font-mono"
          >
            403
          </span>
        </div>

        <h1 className="text-[1.4rem] font-semibold text-[#111] tracking-tight leading-snug mb-3">
          Access Denied
        </h1>

        <p className="text-sm text-[#7A7A72] leading-relaxed max-w-75">
          You don't have permission to view this page. Your current role doesn't
          include the privileges needed for this resource.
        </p>

        {/* Status pill */}
        <div className="mt-5 flex items-center gap-2 bg-black/3 border border-black/[0.07] rounded-[10px] px-4 py-2 w-full justify-center">
          <span className="text-[0.65rem] font-semibold text-[#AEADA6] uppercase tracking-[0.12em] whitespace-nowrap">
            Status
          </span>
          <code className="text-[0.78rem] text-[#444] bg-black/5 px-2 py-0.5 rounded font-mono">
            403 Forbidden
          </code>
        </div>

        <div className="w-full h-px bg-black/[0.07] my-7" />

        <button
          onClick={() => navigate("/")}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-[#F0EEE8] text-sm font-medium px-5 py-3 rounded-xl transition-all duration-150 hover:-translate-y-px active:translate-y-0 cursor-pointer"
        >
          <LayoutDashboard size={16} strokeWidth={2} />
          Go to Dashboard
        </button>
      </main>
    </div>
  );
}
