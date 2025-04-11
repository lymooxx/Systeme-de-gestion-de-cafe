// src/services/MenuService.ts
import { CafeDAO } from "../dao/CafeDAO";
import { PersonnalisationDAO } from "../dao/PersonnalisationDAO";
import { Cafe } from "../models/Cafe";
import { Personnalisation } from "../models/Personnalisation";

export class MenuService {
    async getAvailableCoffees(): Promise<Cafe[]> {
        return await CafeDAO.getAllCafes();
    }

    async getAvailableCustomizations(): Promise<Personnalisation[]> {
        return await PersonnalisationDAO.getAllPersonnalisations();
    }
}