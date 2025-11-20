import api from "@/lib/axios";

export const studentService = {
    addStudent: async (
        name: string,
        birthday: string,
        gender: string
    ) => {
        const res = await api.post('/abc', { name, birthday, gender }, { withCredentials: true });
        return res.data;
    }
}