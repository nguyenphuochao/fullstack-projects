import api from "@/lib/axios";
import type { StudentResponse } from "../types/student";

export const studentService = {
    addStudent: async (name: string, birthday: string, gender: number) => {
        const res = await api.post('/student/add', { name, birthday, gender }, { withCredentials: true });
        return res.data;
    },

    async listStudent(): Promise<StudentResponse> {
        const res = await api.get('/student/list', { withCredentials: true });
        return res.data;
    }
}