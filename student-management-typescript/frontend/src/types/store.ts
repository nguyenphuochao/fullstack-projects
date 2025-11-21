import type { User } from "./user";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    setAccessToken: (accessToken: string) => void
    clearState: () => void
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}