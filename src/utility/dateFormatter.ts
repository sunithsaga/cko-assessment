import { format } from 'date-fns';
export const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    return format(new Date(date), "dd/MM/yyyy, HH:mm:ss")
};