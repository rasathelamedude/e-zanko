import { useEffect, useState } from "react";
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

type TrailAction =
  | "sent"
  | "forwarded"
  | "signed_escalated"
  | "approved"
  | "rejected"
  | "stamped_isdar"
  | "stamped_istirad";

interface TrailEvent {
  id: string;
  action: TrailAction;
  actorName: string;
  actorRole: string;
  actorInstitution: string;
  createdAt: string;
  note?: string | null;
}

interface SignatureBlock {
  id: string;
  name: string;
  role: string;
  institution: string;
  signedAt: string;
}

interface VerificationData {
  documentUUID: string;
  referenceNumber: string;
  title: string;
  submittedAt: string;
  integrityVerified: boolean;
  trail: TrailEvent[];
  signatures: SignatureBlock[];
}

/*
  TODO: Replace with real API call.

  Example:
  const { documentUUID } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify", documentUUID],
    queryFn: () => verifyLetter(documentUUID),
  });
*/
const MOCK_DATA: VerificationData = {
  documentUUID: "a8f3c2e1-9b4d-4f6a-8c1e-2d3f4b5a6c7d",
  referenceNumber: "MHE-2026-00142",
  title: "Open College of Data Science",
  submittedAt: "14 Jun 2026, 09:00",
  integrityVerified: true,
  trail: [
    {
      id: "1",
      action: "sent",
      actorName: "Dr. Karim Yusuf",
      actorRole: "Head of Department",
      actorInstitution: "Software Engineering Dept.",
      createdAt: "14 Jun 2026, 09:00",
    },
    {
      id: "2",
      action: "stamped_isdar",
      actorName: "Dr. Aram Qadir",
      actorRole: "University President",
      actorInstitution: "University of Sulaimani",
      createdAt: "14 Jun 2026, 10:30",
    },
    {
      id: "3",
      action: "stamped_istirad",
      actorName: "Hawre Saeed",
      actorRole: "Import / Export Staff",
      actorInstitution: "Ministry Import / Export Office",
      createdAt: "14 Jun 2026, 14:15",
    },
    {
      id: "4",
      action: "approved",
      actorName: "Dr. A. Mahmoud",
      actorRole: "Ministry Administration Head",
      actorInstitution: "Ministry of Higher Education",
      createdAt: "15 Jun 2026, 09:00",
    },
  ],
  signatures: [
    {
      id: "s1",
      name: "Dr. Aram Qadir",
      role: "University President",
      institution: "University of Sulaimani",
      signedAt: "14 Jun 2026",
    },
    {
      id: "s2",
      name: "Dr. A. Mahmoud",
      role: "Ministry Administration Head",
      institution: "Ministry of Higher Education",
      signedAt: "15 Jun 2026",
    },
  ],
};

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
  signed_escalated: {
    label: "Signed & Escalated",
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<VerificationData | null>(null);

  useEffect(() => {
    // TODO: replace with real fetch using `documentUUID`
    const timer = setTimeout(() => {
      setData(MOCK_DATA);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [documentUUID]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa]">
        <Loader2
          className="h-6 w-6 animate-spin text-[#0f7576]"
          strokeWidth={2}
        />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#e4e9ef] bg-white p-10 text-center shadow-[0_8px_28px_rgba(18,35,55,0.06)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <ShieldAlert className="h-7 w-7 text-red-500" strokeWidth={1.8} />
          </div>
          <h1 className="mb-2 text-lg font-[850] text-[#172033]">
            Document not found
          </h1>
          <p className="text-sm text-[#758498]">
            This verification link is invalid or the document could not be
            located.
          </p>
        </div>
      </div>
    );
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
              data.integrityVerified ? "bg-[#e6f4ea]" : "bg-[#fbe9e9]"
            }`}
          >
            {data.integrityVerified ? (
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
                  data.integrityVerified ? "text-[#1a7d3a]" : "text-[#c0392b]"
                }`}
              >
                {data.integrityVerified
                  ? "Document integrity verified"
                  : "Document integrity could not be verified"}
              </p>
              <p
                className={`text-[12.5px] ${
                  data.integrityVerified ? "text-[#3f9b5c]" : "text-[#d16b60]"
                }`}
              >
                {data.integrityVerified
                  ? "Content matches the original — unaltered since creation"
                  : "Content may have been altered after the original was created"}
              </p>
            </div>
          </div>

          {/* Letter meta */}
          <div className="border-b border-[#e4e9ef] px-7 py-6">
            <p className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-[#9aa6b6]">
              {data.referenceNumber}
            </p>
            <h1 className="mb-2 text-[19px] font-[850] tracking-[-0.01em] text-[#172033]">
              {data.title}
            </h1>
            <p className="text-[13px] text-[#758498]">
              Submitted {data.submittedAt}
            </p>
          </div>

          {/* Document trail */}
          <div className="px-7 py-6">
            <p className="mb-4 text-[12px] font-[850] uppercase tracking-wide text-[#46566a]">
              Document Trail
            </p>

            <div className="space-y-0">
              {data.trail.map((event, index) => {
                const config = ACTION_CONFIG[event.action];
                const isLast = index === data.trail.length - 1;

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
                          {event.createdAt}
                        </p>
                      </div>
                      <p className="text-[13px] text-[#46566a]">
                        {event.actorName} &middot; {event.actorRole}
                      </p>
                      <p className="text-[12.5px] text-[#9aa6b6]">
                        {event.actorInstitution}
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
          {data.signatures.length > 0 && (
            <div className="border-t border-[#e4e9ef] px-7 py-6">
              <p className="mb-4 text-[12px] font-[850] uppercase tracking-wide text-[#46566a]">
                Audit Signatures
              </p>
              <div className="flex flex-wrap gap-6">
                {data.signatures.map((sig) => (
                  <div key={sig.id} className="min-w-45 flex-1">
                    <p className="font-serif text-[16px] italic text-[#172033]">
                      {sig.name}
                    </p>
                    <div className="mt-1.5 h-px w-full bg-[#e4e9ef]" />
                    <p className="mt-1.5 text-[12px] font-semibold text-[#46566a]">
                      {sig.role}
                    </p>
                    <p className="text-[11.5px] text-[#9aa6b6]">
                      {sig.institution} &middot; {sig.signedAt}
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
                {data.documentUUID}
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
