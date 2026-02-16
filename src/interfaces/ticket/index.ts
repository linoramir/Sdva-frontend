export interface ITicketItem {
  quantity?: string;
  detail: string;
  unitPrice?: string;
  amount: string;
}

export interface ITicket {
  receiptNumber: number;
  date: string;
  createdAt?: string;
  paidAt?: string;
  clientName: string;
  clientLocation?: string;
  clientCuit?: string;
  clientDni?: string;
  items: ITicketItem[];
  total: string;
  onBack: () => void;
  isMobile?: boolean;
}
