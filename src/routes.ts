/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    '/auth/login', '/auth/register',
    "/auth/new-verification"
];
  
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
"/auth/login",
"/auth/register",
"/auth/error",
"/auth/reset",
"/auth/new-password"
];
  
/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth/";

type RouteAccessMap = {
    [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
    "/pendinguser" : ["pendinguser"],
    "/admin(.*)": ["admin"],
    "/student(.*)": ["student", "admin"],
    "/teacher(.*)": ["teacher", "admin"],
    "/parent(.*)": ["parent", "admin"],
    "/list/teachers": ["admin", "teacher"],
    "/list/students": ["admin", "teacher"],
    "/list/parents": ["admin", "teacher"],
    "/list/subjects": ["admin"],
    "/list/classes": ["admin", "teacher"],
    "/list/exams": ["admin", "teacher", "student", "parent"],
    "/list/assignments": ["admin", "teacher", "student", "parent"],
    "/list/results": ["admin", "teacher", "student", "parent"],
    "/list/attendance": ["admin", "teacher", "student", "parent"],
    "/list/events": ["admin", "teacher", "student", "parent"],
    "/list/announcements": ["admin", "teacher", "student", "parent"],
}