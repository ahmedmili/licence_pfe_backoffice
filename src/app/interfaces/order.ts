import { OrderBoxs } from "./order-boxs";

export interface Order {
    id: number;
    date_cmd: string;
    heure_cmd: string;
    user_id: number;
    email: string;
    total_prix: number;
    statut: 'En_attente' | 'Validée' | 'Annulée' | 'Récupéré';
    commande_paniers:OrderBoxs[];
  }
  