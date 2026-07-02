import { useParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Send,
  Inbox,
  PenLine,
  Stamp,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { useQuery } from "@tanstack/react-query";
import { fetchVerificationData } from "../../api/auth";
import VerificationDocumentNotFound from "../../components/common/VerificationDocumentNotFound";

type TrailAction =
  | "sent"
  | "forwarded"
  | "signed_raised"
  | "approved"
  | "rejected"
  | "stamped_isdar"
  | "stamped_istirad";

const ACTION_CONFIG: Record<
  TrailAction,
  { label: string; icon: React.ReactNode; tone: string }
> = {
  sent: {
    label: "Sent",
    icon: <Send className="h-4 w-4" strokeWidth={2} />,
    tone: "bg-[#eef1f5] text-[#46566a]",
  },
  forwarded: {
    label: "Forwarded",
    icon: <Inbox className="h-4 w-4" strokeWidth={2} />,
    tone: "bg-[#eef1f5] text-[#46566a]",
  },
  signed_raised: {
    label: "Signed & Raised",
    icon: <PenLine className="h-4 w-4" strokeWidth={2} />,
    tone: "bg-[#e0f0f0] text-[#0f7576]",
  },
  approved: {
    label: "Approved",
    icon: <CheckCircle2 className="h-4 w-4" strokeWidth={2} />,
    tone: "bg-[#e6f4ea] text-[#1a7d3a]",
  },
  rejected: {
    label: "Rejected",
    icon: <XCircle className="h-4 w-4" strokeWidth={2} />,
    tone: "bg-[#fbe9e9] text-[#c0392b]",
  },
  stamped_isdar: {
    label: "Exported · إصدار",
    icon: <Stamp className="h-4 w-4" strokeWidth={2} />,
    tone: "bg-[#fbf1de] text-[#a9762a]",
  },
  stamped_istirad: {
    label: "Imported · استيراد",
    icon: <Stamp className="h-4 w-4" strokeWidth={2} />,
    tone: "bg-[#e6eef6] text-[#3a6ea5]",
  },
};

const VerificationPage = () => {
  const { documentUUID } = useParams();

  const {
    data: verificationData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["document", documentUUID],
    queryFn: () => fetchVerificationData(documentUUID!),
  });

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa]">
        <Loader2
          className="h-6 w-6 animate-spin text-[#0f7576]"
          strokeWidth={2}
        />
      </div>
    );
  }

  if (isError || !verificationData) {
    return <VerificationDocumentNotFound />;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-160">
        {/* Brand header */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <img
            src={logo}
            alt="Kurdistan Regional Government logo"
            className="h-10 w-10 object-contain"
          />
          <div className="text-left">
            <div className="text-[17px] font-[850] leading-none tracking-[-0.02em] text-[#172033]">
              e-Zanko
            </div>
            <div className="text-[11px] font-semibold text-[#758498]">
              Document Verification
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-[#e4e9ef] bg-white shadow-[0_8px_28px_rgba(18,35,55,0.06)]">
          {/* Integrity banner */}
          <div
            className={`flex items-center gap-3 rounded-t-2xl px-7 py-5 ${
              verificationData?.content_verified
                ? "bg-[#e6f4ea]"
                : "bg-[#fbe9e9]"
            }`}
          >
            {verificationData?.content_verified ? (
              <CheckCircle2
                className="h-6 w-6 shrink-0 text-[#1a7d3a]"
                strokeWidth={2}
              />
            ) : (
              <ShieldAlert
                className="h-6 w-6 shrink-0 text-[#c0392b]"
                strokeWidth={2}
              />
            )}
            <div>
              <p
                className={`text-[14.5px] font-[850] ${
                  verificationData?.content_verified
                    ? "text-[#1a7d3a]"
                    : "text-[#c0392b]"
                }`}
              >
                {verificationData?.content_verified
                  ? "Document integrity verified"
                  : "Document integrity could not be verified"}
              </p>
              <p
                className={`text-[12.5px] ${
                  verificationData?.content_verified
                    ? "text-[#3f9b5c]"
                    : "text-[#d16b60]"
                }`}
              >
                {verificationData?.content_verified
                  ? "Content matches the original — unaltered since creation"
                  : "Content may have been altered after the original was created"}
              </p>
            </div>
          </div>

          {/* Letter meta */}
          <div className="border-b border-[#e4e9ef] px-7 py-6">
            <p className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-[#9aa6b6]">
              {verificationData?.letter_number}
            </p>
            <h1 className="mb-2 text-[19px] font-[850] tracking-[-0.01em] text-[#172033]">
              {verificationData?.title}
            </h1>
            <p className="text-[13px] text-[#758498]">
              Created {verificationData?.created_at}
            </p>
          </div>

          {/* Document trail */}
          <div className="px-7 py-6">
            <p className="mb-4 text-[12px] font-[850] uppercase tracking-wide text-[#46566a]">
              Document Trail
            </p>

            <div className="space-y-0">
              {verificationData?.flows.map((event, index) => {
                const config = ACTION_CONFIG[event.action as TrailAction];
                const isLast = index === verificationData?.flows.length - 1;

                return (
                  <div
                    key={event.id}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    {/* Connector line */}
                    {!isLast && (
                      <span className="absolute left-4.75 top-10 h-[calc(100%-20px)] w-px bg-[#e4e9ef]" />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.tone}`}
                    >
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <p className="text-[13.5px] font-[850] text-[#172033]">
                          {config.label}
                        </p>
                        <p className="text-[12px] text-[#9aa6b6]">
                          {event.created_at}
                        </p>
                      </div>
                      <p className="text-[13px] text-[#46566a]">
                        Actor ID {event.actor_id}
                      </p>
                      <p className="text-[12.5px] text-[#9aa6b6]">
                        From {event.from_recipient_id} to{" "}
                        {event.to_recipient_id ?? "N/A"}
                      </p>
                      {event.note && (
                        <p className="mt-1.5 rounded-lg bg-[#f5f7fa] px-3 py-2 text-[12.5px] text-[#46566a]">
                          {event.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signature blocks */}
          {verificationData?.signatures.length > 0 && (
            <div className="border-t border-[#e4e9ef] px-7 py-6">
              <p className="mb-4 text-[12px] font-[850] uppercase tracking-wide text-[#46566a]">
                Audit Signatures
              </p>
              <div className="flex flex-wrap gap-6">
                {verificationData?.signatures.map((sig) => (
                  <div key={sig.id} className="min-w-45 flex-1">
                    <p className="font-serif text-[16px] italic text-[#172033]">
                      {sig.user.name}
                    </p>
                    <div className="mt-1.5 h-px w-full bg-[#e4e9ef]" />
                    <p className="mt-1.5 text-[12px] font-semibold text-[#46566a]">
                      {sig.role_at_time}
                    </p>
                    <p className="text-[11.5px] text-[#9aa6b6]">
                      Signed at {sig.created_at}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document ID footer */}
          <div className="rounded-b-2xl border-t border-[#e4e9ef] bg-[#f5f7fa] px-7 py-4">
            <p className="text-center text-[11px] text-[#9aa6b6]">
              Document ID
              <span className="ml-1.5 font-mono text-[#46566a]">
                {verificationData?.letter_uuid}
              </span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-[11.5px] text-[#9aa6b6]">
          This page verifies the authenticity of official documents issued
          through e-Zanko, Ministry of Higher Education.
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;
