// src/schemas/paymentSchema.ts
import { z } from "zod";

export const PaymentSchema = z.object({
  id: z.string(),
  date: z.string().datetime(), 
  amount: z.number().nonnegative(),
  customerName: z.string().min(1),
  customerAddress: z.string().min(1),
  currency: z.string().min(1),
  description: z.string().optional().default(""),
  status: z.enum(["completed", "pending", "failed", "refunded"]),
});

export type Payment = z.infer<typeof PaymentSchema>;

export const FetchPaymentsResponseSchema = z.object({
  payments: z.array(PaymentSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type FetchPaymentsResponse = z.infer<typeof FetchPaymentsResponseSchema>;

export interface FetchPaymentsParams {
  search?: string;
  currency?: string;
  page?: number;
  pageSize?: number;
}



