import { create } from "zustand";
import { toast } from "sonner";
import type { StudentState } from "../types/store";
import { studentService } from "../services/studentService";

export const useStudentStore = create<StudentState>((set, get) => ({
    students: [],
    student: { _id: '', name: '', birthday: '', gender: 0 },
    totalCount: 0,
    pagination: {
        page: 1,
        totalPages: 0
    },
    loading: false,

    addStudent: async (name: string, birthday: string, gender: number) => {
        try {
            set({ loading: true });
            const { message } = await studentService.addStudent(name, birthday, gender);
            toast.success(message);
        } catch (error) {
            console.error("Lỗi xảy ra khi gọi addStudent:", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchStudent: async (page: number = 1, search: string = '') => {
        try {
            set({ loading: true });
            const { students, totalCount, pagination } = await studentService.listStudent(page, search);
            set({ students });
            set({ totalCount });
            set({ pagination });
        } catch (error) {
            console.error("Lỗi xảy ra khi gọi listStudent:", error);
        } finally {
            set({ loading: false });
        }
    },

    detailStudent: async (id: string) => {
        try {
            set({ loading: true });
            const { student } = await studentService.detailStudent(id);
            set({ student });
        } catch (error) {
            console.error("Lỗi xảy ra khi gọi detailStudent:", error);
        } finally {
            set({ loading: false });
        }
    },

    updateStudent: async (id: string, name: string, birthday: string, gender: number) => {
        try {
            set({ loading: true });
            const { message } = await studentService.updateStudent(id, name, birthday, gender);
            toast.success(message);
        } catch (error) {
            console.error("Lỗi xảy ra khi gọi updateStudent:", error);
        } finally {
            set({ loading: false });
        }
    },

    deleteStudent: async (id: string) => {
        try {
            set({ loading: true });
            const { message } = await studentService.deleteStudent(id);
            toast.success(message);
        } catch (error) {
            console.error("Lỗi xảy ra khi gọi deleteStudent:", error);
        } finally {
            set({ loading: false });
        }
    },

}))