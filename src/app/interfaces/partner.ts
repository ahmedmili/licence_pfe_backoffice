export interface Partner {
    id:number,
    name:string,
    description:string,
    email:string, 
    phone:number,
    password:string,
    image:string,
    category:'SUPERMARKET'|'BAKERY'| 'PASTRIES'| 'RESTAURANT'| 'COFFEE SHOP'|'HOTEL'|'CATERER'| 'LOCAL PRODUCERS',
    openingtime:string,
    closingtime:string
}
