export interface Box {
        id: number;
        title: string;
        description: string | null;
        oldprice: number;
        newprice: number;
        startdate: Date;
        anddate: Date;
        quantity: number;
        remaining_quantity: number;
        image: string;
        category: 'FRUITS AND VEGETABLES'| 'MEAT'| 'PASTRY'|'FISH'| 'DAIRY PRODUCTS'| 'PREPARED DISHES'| 'SWEETS'| 'DRINKS'| 'VEGETARIAN';
        status: 'PENDING'| 'ACCEPTED'| 'REJECTED';
}
