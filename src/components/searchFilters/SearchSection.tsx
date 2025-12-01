import {
  ClearButton,
  FilterRow,
  FlexRow,
  SearchButton,
  SearchInput,
} from "../../styles/components";
import { I18N } from "../../constants/i18n";

interface SearchSectionProps {
  searchValue: string;
    onSearchChange: (value: string) => void;
  onSearchBtnClick: (value: string) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
}

export const SearchSection = ({searchValue,
  onSearchChange,
  onSearchBtnClick,
  onClearFilters,
  hasFilters}: SearchSectionProps) => {

  return (
    <>
      <FlexRow>
        <SearchInput
          type="text"
          placeholder={I18N.SEARCH_PLACEHOLDER}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        <FilterRow>
        <SearchButton onClick={() => onSearchBtnClick(searchValue)}>{I18N.SEARCH_BUTTON}</SearchButton>
        {hasFilters && (
        <ClearButton onClick={onClearFilters}>{I18N.CLEAR_FILTERS}</ClearButton>

        )}
        </FilterRow>
      </FlexRow>
    </>
  );
};
