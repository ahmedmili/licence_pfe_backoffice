export interface Panier {
        id: number;
        title: string;
        description: string | null;
        ancien_prix: number;
        nouveau_prix: number;
        date_dispo: Date;
        quantite: number;
        image: string;
        categorie: 'Fruits_Légumes' | 'Viande' | 'Pâtisserie' | 'Poisson' | 'Produits_Laitiers' | 'Plas_Préparés' | 'Sucreries' | 'Boissons' | 'Végétarien';
}
