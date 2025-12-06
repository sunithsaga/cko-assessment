import { useState } from "react";
import { PaymentsTable } from "../components/paymentTable/PaymentTable";
import { SearchSection } from "../components/searchFilters/SearchSection";
import { usePayments } from "../hooks/usePayments";
import { usePaymentFilters } from "../hooks/usePaymentFilters";
import { Title, Container, Spinner } from "../styles/components";
import { I18N } from "../constants/i18n";
import { ErrorMessage } from "../components/errorMessage/ErrorMessage";
import { Pagination } from "../components/pagination/Pagination";

export const PaymentsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { payments: allPayments, isLoading: isLoadingAll, error: errorAll } = usePayments();


  const {
    payments,
    total,
    pageSize,
    isLoading,
    error,
    setCurrentPage: setPage,
  } = usePaymentFilters({
    search: searchQuery,
    currency,
    page: currentPage,
    pageSize: 5,
  });

  const CURRENCY_LIST = [...new Set(allPayments.map((p) => p.currency))];


  const handleClearFilters = () => {
    setSearchValue("");
    setSearchQuery("");
    setCurrency("");
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchValue(value);
    setCurrentPage(1); 
  };

  const handleCurrencySearch = (value: string) => {
    setPage(1)
    setCurrency(value);
    setCurrentPage(1); 
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPage(page); 
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <SearchSection
        searchValue={searchValue}
        onSearchChange={handleSearch}
        onSearchBtnClick={handleSearch}
        onClearFilters={handleClearFilters}
        hasFilters={searchValue !== "" || currency !== ""}
        currency={currency}
        onCurrencyChange={handleCurrencySearch}
        currencies={CURRENCY_LIST}
      />

      {(isLoading || isLoadingAll) && <Spinner />}

      <ErrorMessage message={error ?? errorAll ?? undefined} />

      {!error &&!isLoading && !isLoadingAll && payments.length > 0 && (
        <>
          <PaymentsTable paymentList={payments} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};
