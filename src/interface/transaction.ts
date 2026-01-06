export type TransactionType = "SEND" | "WITHDRAW" | "DEPOSIT";

export interface Transaction {
  id: number;
  transactionType: TransactionType;
  amount: number;
  createdAt: string;
  from?: string;
  to?: string;
  owner?: string;
}

export interface PageableSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: PageableSort;
  unpaged: boolean;
}

export interface TransactionsResponse {
  content: Transaction[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: PageableSort;
  totalElements: number;
  totalPages: number;
}
