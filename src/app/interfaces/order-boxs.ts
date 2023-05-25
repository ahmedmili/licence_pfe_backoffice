import { Partner } from "./partner";

export interface OrderBoxs {
    id: number;
    box_id: number;
    command_id: number;
    quantity: number;
    newprice:number;
    partner_id:number;
    pivot : any;
    partner : Partner;
    title: string
}
