/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PaymentsTable } from "./PaymentTable";
import { I18N } from "../../constants/i18n";
import { Payment } from "../../types/payment";
describe("PaymentsTable Component", () => {

  test("renders all table headers", () => {
    render(<PaymentsTable paymentList={[]} />);

    expect(screen.getByText(I18N.TABLE_HEADER_PAYMENT_ID)).not.to.be.null;;
    expect(screen.getByText(I18N.TABLE_HEADER_DATE)).not.to.be.null;;
    expect(screen.getByText(I18N.TABLE_HEADER_AMOUNT)).not.to.be.null;;
    expect(screen.getByText(I18N.TABLE_HEADER_CUSTOMER)).not.to.be.null;;
    expect(screen.getByText(I18N.TABLE_HEADER_CURRENCY)).not.to.be.null;;
    expect(screen.getByText(I18N.TABLE_HEADER_STATUS)).not.to.be.null;;
  });

  test("renders empty state when paymentList is empty", () => {
    render(<PaymentsTable paymentList={[]} />);

    expect(screen.getByText(I18N.NO_PAYMENTS_FOUND)).not.to.be.null;;
  });

  test("renders payment rows correctly", () => {
    const mockPayments: Payment[] = [
      {
        id: "pay_1",
        date: "2025-01-01T10:00:00Z",
        amount: 250,
        customerName: "John Doe",
        customerAddress: "Test Street",
        currency: "USD",
        description: "Test desc",
        status: "completed",
      },
    ];

    render(<PaymentsTable paymentList={mockPayments} />);

    // Payment ID
    expect(screen.getByText("pay_1")).not.to.be.null;;


    // Customer
    expect(screen.getByText("John Doe")).not.to.be.null;;

    // Currency
    expect(screen.getByText("USD")).not.to.be.null;;

    // Status badge
    expect(screen.getByText("completed")).not.to.be.null;;
  });

  test("renders multiple rows for multiple payments", () => {
    const mockPayments: Payment[] = [
      {
        id: "1",
        date: "2025-01-01",
        amount: 10,
        customerName: "Alice",
        customerAddress: "A Street",
        currency: "USD",
        description: "",
        status: "pending",
      },
      {
        id: "2",
        date: "2025-01-02",
        amount: 20,
        customerName: "Bob",
        customerAddress: "B Street",
        currency: "EUR",
        description: "",
        status: "failed",
      },
    ];

    render(<PaymentsTable paymentList={mockPayments} />);

    expect(screen.getByText("1")).not.to.be.null;;
    expect(screen.getByText("2")).not.to.be.null;;
    expect(screen.getByText("pending")).not.to.be.null;;
    expect(screen.getByText("failed")).not.to.be.null;;
  });
});