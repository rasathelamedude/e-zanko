import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/common/PageHeader";
import { useUserStore } from "../../store/userStore";
import InboxLetters from "./components/InboxLetters";
import OutboxLetters from "./components/OutboxLetters";
import CompletedLetters from "./components/CompletedLetters";

type Tab = "inbox" | "outbox" | "archived";

const LettersPage = () => {
  const { t } = useTranslation();
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<"inbox" | "outbox" | "archived">(
    "inbox",
  );

  const tabs: { label: string; value: Tab }[] = [
    { label: t("Inbox"), value: "inbox" },
    { label: t("Outbox"), value: "outbox" },
    { label: t("Archived"), value: "archived" },
  ];

  return (
    <div>
      <PageHeader
        title={t("Ministry of higher educations")}
        locationTitle={t("Letters")}
        role={user?.roles[0]?.name || ""}
        year="2023-2024"
      />

      <div className="flex gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.value
                ? "bg-teal-700 text-white rounded-lg"
                : "bg-white rounded-lg border-b border-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "inbox" && <InboxLetters />}
      {activeTab === "outbox" && <OutboxLetters />}
      {activeTab === "archived" && <CompletedLetters />}
    </div>
  );
};

export default LettersPage;
