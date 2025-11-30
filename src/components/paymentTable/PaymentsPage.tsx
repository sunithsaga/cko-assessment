import {PaymentsTable} from "./PaymentTable";
import { usePayments } from "../../hooks/usePayments";



export const PaymentsPage = () => {

  const { 
        payments, 
    } = usePayments({
        search: '',
        currency: '',
        page: 1,
        pageSize: 5
    });

  return <PaymentsTable paymentList={payments} />;
};
