import { db } from "../config/db";
import { Personnalisation } from "../models/Personnalisation";

export class PersonnalisationDAO {
    private static STORAGE_KEY = "personnalisations";

    static async savePersonnalisation(personnalisation: Personnalisation): Promise<void> {
        const personnalisations = await this.getAllPersonnalisations();
        personnalisations.push(personnalisation);
        await db.setItem(this.STORAGE_KEY, personnalisations);
    }

    static async getByType(type: string): Promise<Personnalisation | undefined> {
        const personnalisations = await this.getAllPersonnalisations();
        return personnalisations.find(p => p.type === type);
    }

    static async getAllPersonnalisations(): Promise<Personnalisation[]> {
        return (await db.getItem<Personnalisation[]>(this.STORAGE_KEY)) || [];
    }
}