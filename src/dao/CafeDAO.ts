import { db } from "../config/db";
import { Cafe } from "../models/Cafe";

export class CafeDAO {
    private static STORAGE_KEY = "cafes";

    static async saveCafe(cafe: Cafe): Promise<void> {
        const cafes = await this.getAllCafes();
        cafes.push(cafe);
        await db.setItem(this.STORAGE_KEY, cafes);
    }

    static async getCafeById(id: number): Promise<Cafe | undefined> {
        const cafes = await this.getAllCafes();
        return cafes.find(c => c.idCafe === id);
    }

    static async getAllCafes(): Promise<Cafe[]> {
        return (await db.getItem<Cafe[]>(this.STORAGE_KEY)) || [];
    }
}