import type { Pagination } from "./paginate";

export interface Student {
    _id: string;
    name: string;
    birthday: string;
    gender: number;
}

export interface StudentResponse {
    students: Student[]
    totalCount: number
    pagination: Pagination
}