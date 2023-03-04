export interface Order {
    id: number;
    date_cmd: string;
    heure_cmd: string;
    total_prix: number;
    statut: 'En_attente' | 'Validée' | 'Annulée' | 'Récupéré';
  }
  