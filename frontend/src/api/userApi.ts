import api from './api';
import { User, CreateUserInput, UpdateUserInput } from '../types';

export const getUsers = (search?: string) =>
    api.get<User[]>('/users', { params: { search } });

export const getUserById = (id: number) =>
    api.get<User>(`/users/${id}`);

export const createUser = (data: CreateUserInput) =>
    api.post<User>('/users', data);

export const updateUser = (id: number, data: UpdateUserInput) =>
    api.put<User>(`/users/${id}`, data);

export const deleteUser = (id: number) =>
    api.delete<{ message: string }>(`/users/${id}`);
