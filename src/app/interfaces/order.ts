
import { OrderBoxs } from "./order-boxs";
import { User } from "./user";

export interface Order {
    id: number;
    user_id: number;
    price: number;
    status: 'PENDING'| 'AUTHORIZED'|'REJECTED'|'SUCCESS';
    created_at: Date;
    user:User;
    boxs:OrderBoxs[];
  }
  