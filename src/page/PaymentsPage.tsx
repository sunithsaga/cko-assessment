import { PaymentsTable } from "../components/paymentTable/PaymentTable";
import { SearchSection } from "../components/searchFilters/SearchSection";
import { usePayments } from "../hooks/usePayments";
import { Title, Container, Spinner } from "../styles/components";
import { I18N } from "../constants/i18n";
import { useState } from "react";
import { ErrorMessage } from "../components/errorMessage/ErrorMessage";

export const PaymentsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { payments, error, isLoading } = usePayments({
    search: searchQuery,
    currency: "",
    page: 1,
    pageSize: 5,
  });

  const handleClearFilters = () => {
    setSearchValue("");
    setSearchQuery("");
  };

  function handleSearchClick(value: string): void {
    setSearchQuery(value);
  }

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <SearchSection
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchBtnClick={handleSearchClick}
        onClearFilters={handleClearFilters}
        hasFilters={searchValue !== ""}
      />

      {isLoading && <Spinner />}

      <ErrorMessage message={error} />

      {!isLoading && !error && (
        <PaymentsTable paymentList={payments} />
      )}
    </Container>
  );
};
