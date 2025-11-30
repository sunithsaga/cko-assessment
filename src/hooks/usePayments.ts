// hooks/usePayments.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchPayments, FetchPaymentsParams } from '../services/paymentServices';
import { Payment } from '../types/payment';

interface UsePaymentsReturn {
    payments: Payment[];
    total: number;
    currentPage: number;
    pageSize: number;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}



export const usePayments = (
    params: FetchPaymentsParams = {}
): UsePaymentsReturn => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState( 1);
    const [pageSize] = useState(params.pageSize || 5);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPayments = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchPayments({
                ...params,
                page: currentPage,
                pageSize,
            });

            setPayments(data.payments);
            setTotal(data.total);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            console.error('Error fetching payments:', err);
        } finally {
            setIsLoading(false);
        }
    }, [params.search, params.currency, currentPage, pageSize]);

    useEffect(() => {
        loadPayments();
    }, [loadPayments]);

    return {
        payments,
        total,
        currentPage,
        pageSize,
        isLoading,
        error,
        refetch: loadPayments,
    };
};