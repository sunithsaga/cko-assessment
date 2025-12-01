import { ErrorBox } from "../../styles/components";
import { I18N } from "../../constants/i18n";
interface ErrorMessageProps {
  message?: string | null;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  if (message === '500') {
    return <ErrorBox>{I18N.INTERNAL_SERVER_ERROR}</ErrorBox>;
  }

  if (message === '404') {
    return <ErrorBox>{I18N.PAYMENT_NOT_FOUND}</ErrorBox>;
  }

  return <ErrorBox>{message || I18N.SOMETHING_WENT_WRONG}</ErrorBox>;
};
