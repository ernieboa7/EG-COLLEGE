import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  Base URL (backend running on port 8080)
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api", 
  //baseUrl: import.meta.env.VITE_API_URL || "https://eg-college.onrender.com/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token || localStorage.getItem("token");
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Profile", "Results", "Courses", "Fees", "Payments", "Library",
    "Projects", "Committees", "Departments", "Students", "Timetables",
    "AdminResults", "AdminLibrary", "AdminProjects", "AdminCommittees", "Finance"
  ],
  endpoints: (build) => ({
    // ==================== AUTH ====================
    login: build.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: build.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),


    // Apply form for public
    // ==================== PUBLIC: APPLY ====================
    apply: build.mutation({
      query: (body) => ({
        url: "/applicants",
        method: "POST",
        body,
      }),
    }),

    

    // ==================== ADMIN: APPLICANTS ====================
    adminApplicants: build.query({
      query: () => "/applicants",
        providesTags: ["Applicants"],
    }),

    createApplicant: build.mutation({
      query: (body) => ({
        url: "/applicants",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Applicants"],
    }),

    updateApplicant: build.mutation({
      query: ({ _id, ...body }) => ({
        url: `/applicants/${_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Applicants"],
    }),
  
    deleteApplicant: build.mutation({
      query: (id) => ({
        url: `/applicants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applicants"],
    }),




    // ==================== STUDENT PORTAL ====================
    profile: build.query({
      query: () => "/students/profile",
      providesTags: ["Profile"],
    }),
    results: build.query({
      query: (sid) => `/students/results/${sid}`,
      providesTags: ["Results"],
    }),
    enrol: build.mutation({
      query: (body) => ({ url: "/students/enroll", method: "POST", body }),
      invalidatesTags: ["Profile", "Courses"],
    }),
    unenroll: build.mutation({
      query: (body) => ({ url: "/students/unenroll", method: "POST", body }),
      invalidatesTags: ["Profile", "Courses"],
    }),
    availableCourses: build.query({
      query: () => "/students/courses", // backend route for getAvailableCourses
      providesTags: ["Courses"],
    }),

    
  /*  coursesByIds: build.query({
      query: (idsCsv) => ({ url: "/courses/byIds", params: { ids: idsCsv } }),
      providesTags: ["Courses"],
    }),
    */
    coursesByIds: build.query({
      query: (idsCsv) => {
        if (!idsCsv) return { url: "/students/courses/byIds", skip: true };
        return { url: "/students/courses/byIds", params: { ids: idsCsv } };
      },
      providesTags: ["Courses"],
    }),


    
    studentProjects: build.query({
      query: (sid) => `/students/projects/${sid}`,
      providesTags: ["Projects"],
    }),

    uploadProject: build.mutation({
      query: (formData) => ({
        url: "/students/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),

    

    selectProject: build.mutation({
      query: (body) => ({
        url: "/students/select-project",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),









    library: build.query({
      query: () => "/library",
      providesTags: ["Library"],
    }),

    // ==================== LIBRARY BORROWS ====================
    borrowBook: build.mutation({
      query: (body) => ({ url: "/borrows/borrow", method: "POST", body }),
      invalidatesTags: ["Library"],
    }),
    returnBook: build.mutation({
      query: (body) => ({ url: "/borrows/return", method: "POST", body }),
      invalidatesTags: ["Library"],
    }),
    myBorrows: build.query({
      query: (studentId) => `/borrows/my/${studentId}`,
      providesTags: ["Library"],
    }),
    adminBorrows: build.query({
      query: () => "/borrows/all",
      providesTags: ["Library"],
    }),







    fees: build.query({
      query: () => "/payments/fees",
      providesTags: ["Fees"],
    }),
    paymentHistory: build.query({
      query: (sid) => `/payments/history/${sid}`,
      providesTags: ["Payments"],
    }),
    checkout: build.mutation({
      query: (body) => ({ url: "/payments/checkout", method: "POST", body }),
    }),

    // ==================== ADMIN: STUDENTS ====================
    adminStudents: build.query({
      query: () => "/admin/students",
      providesTags: ["Students"],
    }),
    createAdminStudent: build.mutation({
      query: (body) => ({ url: "/admin/students", method: "POST", body }),
      invalidatesTags: ["Students"],
    }),
    updateAdminStudent: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/students/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteAdminStudent: build.mutation({
      query: (_id) => ({
        url: `/admin/students/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),


    

    // ==================== ADMIN: DEPARTMENTS ====================
    adminDepartments: build.query({
      query: () => "/admin/departments",
      providesTags: ["Departments"],
    }),
    createAdminDepartment: build.mutation({
      query: (body) => ({ url: "/admin/departments", method: "POST", body }),
      invalidatesTags: ["Departments"],
    }),
    updateAdminDepartment: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/departments/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Departments"],
    }),
    deleteAdminDepartment: build.mutation({
      query: (_id) => ({
        url: `/admin/departments/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),

    // ==================== ADMIN: COURSES ====================
    adminCourses: build.query({
      query: () => "/admin/courses",
      providesTags: ["Courses"],
    }),
    createAdminCourse: build.mutation({
      query: (body) => ({ url: "/admin/courses", method: "POST", body }),
      invalidatesTags: ["Courses"],
    }),
    updateAdminCourse: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/courses/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteAdminCourse: build.mutation({
      query: (_id) => ({
        url: `/admin/courses/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),

    // ==================== ADMIN: TIMETABLES ====================
    adminTimetables: build.query({
      query: () => "/admin/timetables",
      providesTags: ["Timetables"],
    }),
    createAdminTimetable: build.mutation({
      query: (body) => ({ url: "/admin/timetables", method: "POST", body }),
      invalidatesTags: ["Timetables"],
    }),
    updateAdminTimetable: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/timetables/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Timetables"],
    }),
    deleteAdminTimetable: build.mutation({
      query: (_id) => ({
        url: `/admin/timetables/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Timetables"],
    }),

    // ==================== ADMIN: RESULTS ====================
    adminResults: build.query({
      query: () => "/admin/results",
      providesTags: ["AdminResults"],
    }),
    createAdminResult: build.mutation({
      query: (body) => ({ url: "/admin/results", method: "POST", body }),
      invalidatesTags: ["AdminResults", "Results"],
    }),
    updateAdminResult: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/results/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["AdminResults", "Results"],
    }),
    deleteAdminResult: build.mutation({
      query: (_id) => ({
        url: `/admin/results/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminResults", "Results"],
    }),

    // ==================== ADMIN: LIBRARY ====================
    adminLibrary: build.query({
      query: () => "/admin/library",
      providesTags: ["AdminLibrary"],
    }),
    createAdminLibrary: build.mutation({
      query: (body) => ({ url: "/admin/library", method: "POST", body }),
      invalidatesTags: ["AdminLibrary", "Library"],
    }),
    updateAdminLibrary: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/library/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["AdminLibrary", "Library"],
    }),
    deleteAdminLibrary: build.mutation({
      query: (_id) => ({
        url: `/admin/library/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminLibrary", "Library"],
    }),

    // ==================== ADMIN: PROJECTS ====================
    adminProjects: build.query({
      query: () => "/admin/projects",
      providesTags: ["AdminProjects", "Projects"],
    }),
    createAdminProject: build.mutation({
      query: (body) => ({ url: "/admin/projects", method: "POST", body }),
      invalidatesTags: ["AdminProjects", "Projects"],
    }),
    updateAdminProject: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/projects/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["AdminProjects", "Projects"],
    }),
    deleteAdminProject: build.mutation({
      query: (_id) => ({
        url: `/admin/projects/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminProjects", "Projects"],
    }),

    // ==================== ADMIN: COMMITTEES ====================
    adminCommittees: build.query({
      query: () => "/admin/committees",
      providesTags: ["AdminCommittees", "Committees"],
    }),
    createAdminCommittee: build.mutation({
      query: (body) => ({ url: "/admin/committees", method: "POST", body }),
      invalidatesTags: ["AdminCommittees", "Committees"],
    }),
    updateAdminCommittee: build.mutation({
      query: ({ _id, ...patch }) => ({
        url: `/admin/committees/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["AdminCommittees", "Committees"],
    }),
    deleteAdminCommittee: build.mutation({
      query: (_id) => ({
        url: `/admin/committees/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminCommittees", "Committees"],
    }),

    // ==================== ADMIN: FINANCE ====================
    adminPayments: build.query({
      query: () => "/admin/payments",
      providesTags: ["Finance"],
    }),

    committees: build.query({
      query: () => "/committees",
      providesTags: ["Committees"],
    }),

    adminDashboard: build.query({
      query: () => "/admin/dashboard",
      providesTags: ["Dashboard"],
    }),





  }),
});

// ✅ Export Hooks (corrected names)
export const {
  // Auth
  useLoginMutation,
  useRegisterMutation,
  

  // updated application process
  useApplyMutation,
  useAdminApplicantsQuery,
  useCreateApplicantMutation,
  useUpdateApplicantMutation,
  useDeleteApplicantMutation,


  // Student Portal
  useProfileQuery,
  useResultsQuery,
  useEnrolMutation,
  useUnenrollMutation,
  useAvailableCoursesQuery,

  useStudentProjectsQuery,
  useSelectProjectMutation,
  useUploadProjectMutation,


  useCoursesByIdsQuery,
  useLibraryQuery,

  useBorrowBookMutation,
  useReturnBookMutation,
  useMyBorrowsQuery,
  useAdminBorrowsQuery,

  useFeesQuery,
  usePaymentHistoryQuery,
  useCheckoutMutation,

  // Admin - Students
  useAdminStudentsQuery,
  useCreateAdminStudentMutation,
  useUpdateAdminStudentMutation,
  useDeleteAdminStudentMutation,

  // Admin - Departments
  useAdminDepartmentsQuery,
  useCreateAdminDepartmentMutation,
  useUpdateAdminDepartmentMutation,
  useDeleteAdminDepartmentMutation,

  // Admin - Courses
  useAdminCoursesQuery,
  useCreateAdminCourseMutation,
  useUpdateAdminCourseMutation,
  useDeleteAdminCourseMutation,

  // Admin - Timetables
  useAdminTimetablesQuery,
  useCreateAdminTimetableMutation,
  useUpdateAdminTimetableMutation,
  useDeleteAdminTimetableMutation,

  // Admin - Results
  useAdminResultsQuery,
  useCreateAdminResultMutation,
  useUpdateAdminResultMutation,
  useDeleteAdminResultMutation,

  // Admin - Library
  useAdminLibraryQuery,
  useCreateAdminLibraryMutation,
  useUpdateAdminLibraryMutation,
  useDeleteAdminLibraryMutation,

  // Admin - Projects
  useAdminProjectsQuery,
  useCreateAdminProjectMutation,
  useUpdateAdminProjectMutation,
  useDeleteAdminProjectMutation,

  // Admin - Committees
  useAdminCommitteesQuery,
  useCreateAdminCommitteeMutation,
  useUpdateAdminCommitteeMutation,
  useDeleteAdminCommitteeMutation,

  // Admin - Finance
  useAdminPaymentsQuery,

  useAdminDashboardQuery,


  useCommitteesQuery,


} = api;
