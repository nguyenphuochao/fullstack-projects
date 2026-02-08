import api from "@/lib/axios";
import type { StudentResponse } from "../types/student";

export const studentService = {
    addStudent: async (name: string, birthday: string, gender: number) => {
        const res = await api.post('/student/add', { name, birthday, gender }, { withCredentials: true });
        return res.data;
    },

    async listStudent(page: number, search: string): Promise<StudentResponse> {
        const res = await api.get(`/student/list?page=${page}&search=${search}`, { withCredentials: true });
        return res.data;
    },

    detailStudent: async (id: string) => {
        const res = await api.get(`/student/detail/${id}`, { withCredentials: true });
        return res.data;
    },

    updateStudent: async (id: string, name: string, birthday: string, gender: number) => {
        const res = await api.post('/student/update', { id, name, birthday, gender }, { withCredentials: true });
        return res.data;
    },

    deleteStudent: async (id: string) => {
        const res = await api.post('/student/delete', { id }, { withCredentials: true });
        return res.data;
    },
}