import PageHeader from "../../../components/common/PageHeader";
import { useUserStore } from "../../../store/userStore";

const MinistrySettingsPage = () => {
  const { user } = useUserStore();

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <PageHeader
        title="Ministry of higher education"
        locationTitle="Settings"
        role={user?.role ?? ""}
        year="2023-2024"
      />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-teal-100 text-[#0f7576] flex items-center justify-center text-xl font-bold">
              AM
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
              <p className="text-slate-500">System Administrator</p>
              <p className="text-slate-500">{user?.email}</p>
            </div>
          </div>

          <span className="bg-teal-100 text-[#0f7576] text-xs font-bold px-3 py-1 rounded-md">
            MINISTRY
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            System Preferences
          </h2>
          <p className="text-sm text-slate-500">Configure system options.</p>
        </div>

        <div className="p-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Date format
            </label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white">
              <option>Gregorian</option>
              <option>Kurdish / Local</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Theme
            </label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Security</h2>
          <p className="text-sm text-slate-500">
            Manage your account security options.
          </p>
        </div>

        <div className="px-6">
          <div className="py-4 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Two-step verification
              </h3>
              <p className="text-sm text-slate-500">
                Add an extra layer of security to your account.
              </p>
            </div>

            <button className="border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium">
              Enable
            </button>
          </div>

          <div className="py-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Password</h3>
              <p className="text-sm text-slate-500">
                Change your account password.
              </p>
            </div>

            <button className="border border-[#0f7576] text-[#0f7576] px-5 py-2 rounded-lg text-sm font-medium">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistrySettingsPage;
