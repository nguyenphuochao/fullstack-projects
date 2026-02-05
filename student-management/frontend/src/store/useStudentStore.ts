import { create } from "zustand";
import { toast } from "sonner";
import type { StudentState } from "../types/store";
import { studentService } from "../services/studentService";

export const useStudentStore = create<StudentState>((set, get) => ({
    students: [],
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

    fetchStudent: async (page?: number, search?: string) => {
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
    }
}))