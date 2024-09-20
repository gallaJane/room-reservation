export const publicRoutes = [
    "/",
    "room-details/:id",
    '/api/uploadthing'
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
];

// The prefix for API authentication routes
export const apiAuthPrefix = "/api/auth";


// The default redirect path after signin
export const DEFAULT_SIGNIN_REDIRECT = "/";