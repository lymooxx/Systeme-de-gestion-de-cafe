import { db } from "../config/db";
import { Reduction } from "../models/Reduction";

export class ReductionDAO {
    private static STORAGE_KEY = "reductions";

    static async saveReduction(reduction: Reduction): Promise<void> {
        const reductions = await this.getAllReductions();
        reductions.push(reduction);
        await db.setItem(this.STORAGE_KEY, reductions);
    }

    static async getReductionById(id: number): Promise<Reduction | undefined> {
        const reductions = await this.getAllReductions();
        return reductions.find(r => r.idReduction === id);
    }

    static async getAllReductions(): Promise<Reduction[]> {
        return (await db.getItem<Reduction[]>(this.STORAGE_KEY)) || [];
    }
}