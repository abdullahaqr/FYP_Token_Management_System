export const THEMES = {
    LIGHT: "light",
    DARK: "dark",
};

export const endpoint = {
    signIn: "/sign-in",
    signUp: "/sign-up",
    putUpdatePatientById: "/patients",
    getPatientById: "/patients",
    getDoctorById: "/doctors",
    putUpdateDoctorById: "/doctors",
    updateDoctorHospitalSchedule: "/doctor-hospital-schedule",
    getAllDoctorHospitalSchedules: "/doctor-hospital-schedule",
    updateAppointment: "/appointment",
    getAllAppointments: "/appointment",
    patchUpdateAppointmentStatusById: "/appointment",
    putUpdateBookedToken: "/booked-token",
    putUpdateCurrentToken: "/current-token",
    getAllDoctorByLoginHospital: "/hospital-doctor",
    getAllPatientsByLoginDoctor: "/doctor-patient",
    getAllHospitals: "/hospitals",
    getHospitalSearchByName: "/hospitals",
    getRetrieveDoctorForSpecificHospitalById: "/hospital-specific-doctor",
    getAllAppointmentByLoginDoctor: "/doctor-appointment",
    getAllAppointmentByLoginHospital: "/hospital-appointment",
    getAllPatientsByLoginHospital: "/hospital-patient",
    forgotPassword: "/forgot-password",
    changePassword: "/change-password",
    profileImageUpdateById: "/image",
    getSpecificDoctorScheduleById: "/doctor-hospital-schedule",
    getProfileDataForUserById: "/users",
    getBookedTokenById: "/get-booked-token",
};

export const urls = {
    signIn: "/template/login",
    // editDonor: "/dashboard/edit-donor",
    // donorList: "/dashboard/donor-list",
    // categoryList: "/dashboard/blogs-category",
    // universityList: "/dashboard/universities",
    // eventList: "/dashboard/events",
    // blogList: "/dashboard/blog-posts",
};
