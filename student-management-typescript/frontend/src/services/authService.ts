import api from "@/lib/axios";

export const authService = {
    signIn: async (email: string, password: string) => {
        const res = await api.post('/auth/signin', { email, password }, { withCredentials: true });
        return res.data;
    },

    signOut: async () => {
        return api.post('/auth/signout', {}, { withCredentials: true });
    },

    fetchMe: async () => {
        const res = await api.get('/user/profile', { withCredentials: true });
        return res.data;
    }
}

