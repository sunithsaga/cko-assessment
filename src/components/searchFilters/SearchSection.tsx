import {
  ClearButton,
  FilterRow,
  SearchButton,
  SearchInput,
} from "../../styles/components";
import { CurrencyFilter } from "./CurrencyFilter";
import { I18N } from "../../constants/i18n";

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchBtnClick: (value: string) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
  currency: string;
  onCurrencyChange: (value: string) => void;
  currencies: string[];
}

export const SearchSection = ({
  searchValue,
  onSearchChange,
  onSearchBtnClick,
  onClearFilters,
  hasFilters,
  currency,
  onCurrencyChange,
  currencies,
}: SearchSectionProps) => {
  return (
    <>
        

        <FilterRow>
<SearchInput
          type="text"
          placeholder={I18N.SEARCH_PLACEHOLDER}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
          <CurrencyFilter
            currencies={currencies}
            value={currency}
            onCurrencyChange={onCurrencyChange}
          ></CurrencyFilter>

          <SearchButton onClick={() => onSearchBtnClick(searchValue)}>
            {I18N.SEARCH_BUTTON}
          </SearchButton>

          {hasFilters && (
            <ClearButton onClick={onClearFilters}>
              {I18N.CLEAR_FILTERS}
            </ClearButton>
          )}
        </FilterRow>
    </>
  );
};
