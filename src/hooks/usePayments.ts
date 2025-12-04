import { Payment, FetchPaymentsParams } from './../types/payment';
import { useState, useEffect, useCallback } from "react";
import { fetchPayments,  } from "../services/paymentServices";

interface UsePaymentsReturn {
  payments: Payment[];
  total: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  setCurrentPage: (page: number) => void;
}

export const usePayments = (
  params: FetchPaymentsParams = {}
): UsePaymentsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(params.page || 1);
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
    isLoading,
    error,
    refetch: loadPayments,
    setCurrentPage,
  };
};
