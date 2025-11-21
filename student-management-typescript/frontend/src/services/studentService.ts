import api from "@/lib/axios";
import type { Student } from "../types/student";

export const studentService = {
    addStudent: async (
        name: string,
        birthday: string,
        gender: string
    ): Promise<Student> => {
        const res = await api.post('/abc', { name, birthday, gender }, { withCredentials: true });
        return res.data;
    },

    async listStudent(): Promise<Student> {
        const res = await api.get('/student/list', { withCredentials: true });
        return res.data;
    }
}