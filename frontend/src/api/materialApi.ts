import api from './api';
import { Material, CreateMaterialInput, UpdateMaterialInput } from '../types';

export const getMaterials = (search?: string) =>
    api.get<Material[]>('/materials', { params: { search } });

export const getMaterialById = (id: number) =>
    api.get<Material>(`/materials/${id}`);

export const createMaterial = (data: CreateMaterialInput) =>
    api.post<Material>('/materials', data);

export const updateMaterial = (id: number, data: UpdateMaterialInput) =>
    api.put<Material>(`/materials/${id}`, data);

export const deleteMaterial = (id: number) =>
    api.delete<{ message: string }>(`/materials/${id}`);
