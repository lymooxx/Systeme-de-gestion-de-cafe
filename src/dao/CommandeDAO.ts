
import { db } from "../config/db";
import { Commande } from '../models/Commande';

export class CommandeDAO {
    private static STORAGE_KEY = "commandes";

    static async saveCommande(commande: Commande): Promise<void> {
        const commandes = await this.getAllCommandes();
        commandes.push(commande);
        await db.setItem(this.STORAGE_KEY, commandes);
    }

    static async getAllCommandes(): Promise<Commande[]> {
        return (await db.getItem<Commande[]>(this.STORAGE_KEY)) || [];
    }
}