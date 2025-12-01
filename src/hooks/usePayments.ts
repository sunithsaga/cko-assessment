import { useState, useEffect, useCallback } from "react";
import { fetchPayments, FetchPaymentsResponse } from "../services/paymentServices";
import { Payment } from "../types/payment";

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

export const usePayments = (): UsePaymentsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data: FetchPaymentsResponse = await fetchPayments({ page: currentPage, pageSize });
      setPayments(data.payments ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An error occurred";
      setError(errMsg);
      console.error("Error fetching payments:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize]);

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
