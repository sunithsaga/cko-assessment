import { API_URL } from '../constants';
import {  FetchPaymentsResponseSchema, FetchPaymentsResponse, FetchPaymentsParams } from '../types/payment';



export const fetchPayments = async (
  params: FetchPaymentsParams = {}
): Promise<FetchPaymentsResponse> => {
  const { search = '', currency = '', page = 1, pageSize = 5 } = params;

  const queryParams = new URLSearchParams({
    search,
    currency,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const response = await fetch(`${API_URL}?${queryParams}`);

  let json: unknown;
  try {
    json = await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to parse API response as JSON");
  }
  
    if (!response.ok) {
    console.log(response.status)
    throw new Error(JSON.stringify(response.status));
  }


  const parsed = FetchPaymentsResponseSchema.safeParse(json);


  if (!parsed.success) {
    console.error("Invalid API response", parsed.error);
    throw new Error("Invalid API response format");
  }



  return parsed.data;
};