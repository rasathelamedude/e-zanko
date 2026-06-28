export const getMinistryDashboardAnalytics = async () => {
  // TODO: call GET /api/dashboard endpoint once it's implemented

  return {
    totalUniversities: 32,
    totalPendingLetters: 18,
    totalApprovedLettersThisMonth: 14,
  };
};

export const getUniversityDashboardAnalytics = async () => {
  // TODO: call GET /api/dashboard endpoint once it's implemented

  return {
    totalFaculties: 32,
    totalPendingLetters: 18,
    totalActiveDeans: 14,
  };
};

export const getDepartmentHeadDashboardAnalytics = async () => {
  // TODO: call GET /api/dashboard endpoint once it's implemented

  return {
    pendingLetters: 18,
    approvedLettersThisMonth: 14,
    rejectedLettersThisMonth: 12,
    departmentInfo: {
      department: "Software Engineering",
      faculty: "Faculty of Engineering",
      students: 32,
      lecturers: 14,
    },
  };
};
