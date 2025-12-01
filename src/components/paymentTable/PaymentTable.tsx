import {
    TableWrapper,
    Table,
    TableHeaderWrapper,
    TableHeaderRow,
    TableHeader,
    TableBodyWrapper,
    TableRow,
    TableCell,
    StatusBadge,
    EmptyBox,
} from '../../styles/components'
import { I18N } from '../../constants/i18n'
import { Payment } from "../../types/payment";
import {formatDateTime} from '../../utility/dateFormatter';
import {formatCurrency} from '../../utility/currencyFormatter';

interface PaymentsTableProps {
    paymentList: Payment[];  
}



export const PaymentsTable = ({ paymentList }: PaymentsTableProps) => {

    return (
            <TableWrapper>
                <Table>
                    <TableHeaderWrapper>
                        <TableHeaderRow>
                            <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
                            <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
                            <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
                            <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
                            <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
                            <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
                        </TableHeaderRow>
                    </TableHeaderWrapper>

                    <TableBodyWrapper>
                        {paymentList.length === 0 ? (
                            <tr>
                                <td colSpan={6}>
                                    <EmptyBox>{I18N.NO_PAYMENTS_FOUND}</EmptyBox>
                                </td>
                            </tr>
                        ) : (
                            paymentList.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.id}</TableCell>
                                    <TableCell>{formatDateTime(p.date)}</TableCell>
                                    <TableCell>{formatCurrency(p.amount)}</TableCell>
                                    <TableCell>{p.customerName}</TableCell>
                                    <TableCell>{p.currency}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={p.status}>{p.status}</StatusBadge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBodyWrapper>
                </Table>
            </TableWrapper>
    )
}