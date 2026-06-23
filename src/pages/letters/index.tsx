import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { useUserStore } from "../../store/userStore";
import InboxLetters from "./components/InboxLetters";
import OutboxLetters from "./components/OutboxLetters";
import ArchivedLetters from "./components/ArchivedLetters";

type Tab = "inbox" | "outbox" | "archived";

const tabs: { label: string; value: Tab }[] = [
  { label: "Inbox", value: "inbox" },
  { label: "Outbox", value: "outbox" },
  { label: "Archived", value: "archived" },
];

const LettersPage = () => {
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<"inbox" | "outbox" | "archived">(
    "inbox",
  );

  return (
    <div>
      <PageHeader
        title="Ministry of higher educations"
        locationTitle="Letters"
        role={user?.role || ""}
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
      {activeTab === "archived" && <ArchivedLetters />}
    </div>
  );
};

export default LettersPage;
