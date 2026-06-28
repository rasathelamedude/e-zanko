import { useUserStore } from "../store/userStore";

export function useBreadcrumbAccess() {
  const user = useUserStore((state) => state.user);

  return {
    canAccessUniversities: !user?.scope || user.scope === "MINISTRY",
    canAccessFaculties:
      !user?.scope || user.scope === "MINISTRY" || user.scope === "UNIVERSITY",
    canAccessDepartments:
      !user?.scope ||
      user.scope === "MINISTRY" ||
      user.scope === "UNIVERSITY" ||
      user.scope === "FACULTY",
  };
}