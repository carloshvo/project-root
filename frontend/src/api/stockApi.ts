import api from './api';
import { StockMovement, CreateMovementInput, UpdateMovementInput } from '../types';

export const getStockMovements = () =>
    api.get<StockMovement[]>('/stock/movements');

export const createStockMovement = (data: CreateMovementInput) =>
    api.post<StockMovement>('/stock/movements', data);

export const updateStockMovement = (id: number, data: UpdateMovementInput) =>
    api.put<StockMovement>(`/stock/movements/${id}`, data);

export const deleteStockMovement = (id: number) =>
    api.delete<{ message: string }>(`/stock/movements/${id}`);
