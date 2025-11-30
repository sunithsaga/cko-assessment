export interface Payment {

    id: string
    date: string,
    amount: number
    customerName: string,
    customerAddress: string
    currency: string
    description: string
    status: 'completed' | 'pending' | 'failed' | 'refunded'

}

// export interface PaymentSearchResponse {
// }
