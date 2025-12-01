import { Select } from "../../styles/components";
import { I18N } from "../../constants/i18n";

interface CurrencyFilterProps {
  currencies: string[];
  value: string;
  onCurrencyChange: (value: string) => void;
}

export const CurrencyFilter = ({
  currencies,
  value,
  onCurrencyChange,
}: CurrencyFilterProps) => {
  return (
    <Select
      name="currency"
      value={value ?? ""}
      aria-label={I18N.CURRENCY_FILTER_LABEL}
      onChange={(e) => onCurrencyChange?.(e.target.value)}
    >
      <option value="" disabled>
        {I18N.CURRENCIES_OPTION}
      </option>
      {currencies.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </Select>
  );
};
