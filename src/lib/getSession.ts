import { auth } from "@/auth";
import { cache } from "react";

const cachedAuth = cache(auth);

export const currentUser = async () => {
    const session = await cachedAuth();
    return session?.user;
};

export const currentRole = async () => {
    const session = await cachedAuth();
    return session?.user?.role;
};

export default cachedAuth;