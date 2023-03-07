export interface Panier {
        id: number;
        title: string;
        description: string | null;
        ancien_prix: number;
        nouveau_prix: number;
        date_debut: Date;
        date_fin: Date;
        quantity: number;
        remaining_quantity: number;
        image: string;
        categorie: 'Fruits_Légumes' | 'Viande' | 'Pâtisserie' | 'Poisson' | 'Produits_Laitiers' | 'Plas_Préparés' | 'Sucreries' | 'Boissons' | 'Végétarien';
        status: 'PENDING'| 'ACCEPTED'| 'REJECTED';
}
