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

export const usePaymentFilters = (
  params: FetchPaymentsParams = {}
): UsePaymentsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(params.pageSize || 5);

  const currentPage = params.page || 1;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPayments({
        search: params.search,
        currency: params.currency,
        page: currentPage,
        pageSize,
      });

      setPayments(data.payments ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errMsg);
      console.error("Error fetching payments:", err);
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
    error,
    isLoading,
    refetch: loadPayments,
  };
};
