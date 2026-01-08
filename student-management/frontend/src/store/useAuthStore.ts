import { create } from "zustand";
import { toast } from "sonner";
import type { AuthState } from "../types/store";
import { authService } from "../services/authService";

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    setAccessToken: (accessToken) => {
        set({ accessToken });
    },

    clearState: () => {
        set({ accessToken: null, user: null, loading: false });
    },

    signIn: async (email, password) => {
        try {
            set({ loading: true });
            const { accessToken } = await authService.signIn(email, password);
            get().setAccessToken(accessToken);
            toast.success("Đăng nhập tài khoản thành công!");
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },

    signOut: async () => {
        get().clearState();
    },

    fetchMe: async () => {
        try {
            set({ loading: true });
            const user = await authService.fetchMe();
            set({ user });
        } catch (error) {
            set({ user: null, accessToken: null });
            toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng. Hãy thử lại!");
        } finally {
            set({ loading: false });
        }
    },

    refresh: async () => {
        try {
            set({ loading: true });
            const { user, fetchMe, setAccessToken } = get();
            const accessToken = await authService.refreshToken();
            setAccessToken(accessToken);

            if (!user) {
                await fetchMe();
            }
        } catch (error) {
            toast.error("Lỗi xảy ra refresh token. Hãy thử lại!");
            get().clearState();
        } finally {
            set({ loading: false });
        }
    }
}))