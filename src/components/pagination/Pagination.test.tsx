import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Pagination } from "./Pagination";
import { I18N } from "../../constants/i18n";

describe("Pagination Component", () => {
  test("calls onPageChange when clicking previous", () => {
    const mockOnPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const prevButton = screen.getByRole("button", { name: I18N.PREVIOUS_BUTTON });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange when clicking next", () => {
    const mockOnPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const nextButton = screen.getByRole("button", { name: I18N.NEXT_BUTTON });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("disables previous button on the first page", () => {
    const mockOnPageChange = vi.fn();

    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const prevButton = screen.getByRole("button", { name: I18N.PREVIOUS_BUTTON });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test("disables next button on the last page", () => {
    const mockOnPageChange = vi.fn();

    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const nextButton = screen.getByRole("button", { name: I18N.NEXT_BUTTON });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
