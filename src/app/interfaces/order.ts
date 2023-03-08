import { OrderBoxs } from "./order-boxs";

export interface Order {
    id: number;
    user_id: number;
    price: number;
    status: 'PENDING'| 'AUTHORIZED'|'REJECTED'|'SUCCESS';
    created_at: string;
    command_panier:OrderBoxs[];
  }
  