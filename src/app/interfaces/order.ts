
import { OrderBoxs } from "./order-boxs";
import { User } from "./user";

export interface Order {
    id: number;
    user_id: number;
    user_email: string;
    price: number;
    status: 'PENDING'| 'SUCCESS'|'CANCEL';
    created_at: Date;
    user:User;
    boxs:OrderBoxs[];
  }
  