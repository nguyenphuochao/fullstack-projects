import type { Pagination } from "./paginate";
import type { Student } from "./student";
import type { User } from "./user";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    setAccessToken: (accessToken: string) => void;
    clearState: () => void;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    fetchMe: () => Promise<void>;
    refresh: () => Promise<void>;
}

export interface StudentState {
    students: Student[];
    totalCount: number;
    pagination: Pagination;
    loading: boolean;

    addStudent: (name: string, birthday: string, gender: number) => Promise<void>;
    fetchStudent: (page?: number, search?: string) => Promise<void>;
}

export interface ModalConfirmState {
    isOpen: boolean;
    setModalConfirm: (open: boolean) => void;
}