import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();
    return session?.user;
};

export const currentRole = async (): Promise<string>=> {
    const session = await auth();
    return session?.user?.role ?? '';
};
