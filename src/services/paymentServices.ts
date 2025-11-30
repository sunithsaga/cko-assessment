import { API_URL } from '../constants';
import { Payment } from '../types/payment';

export interface FetchPaymentsParams {
    search?: string;
    currency?: string;
    page?: number;
    pageSize?: number;
}

export interface FetchPaymentsResponse {
    payments: Payment[];
    total: number;
    page: number;
    pageSize: number;
}

export const fetchPayments = async (
    params: FetchPaymentsParams = {}
): Promise<FetchPaymentsResponse> => {
    const {
        search = '',
        currency = '',
        page = 1,
        pageSize = 5
    } = params;

    const queryParams = new URLSearchParams({
        search,
        currency,
        page: page.toString(),
        pageSize: pageSize.toString(),
    });

    const response = await fetch(`${API_URL}?${queryParams}`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
};