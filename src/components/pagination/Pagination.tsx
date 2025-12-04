import { PaginationButton, PaginationRow } from "../../styles/components";
import { I18N } from "../../constants/i18n";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null; 

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  return (
    <PaginationRow>
      <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>{I18N.PREVIOUS_BUTTON}</PaginationButton>
      <span>{I18N.PAGE_LABEL} {currentPage}</span>
      <PaginationButton onClick={handleNext} disabled={currentPage === totalPages}>{I18N.NEXT_BUTTON}</PaginationButton>
    </PaginationRow>
  );
};
