// utils/coffeeHelpers.ts
import { Cafe } from "../models/Cafe";

export function isCoffeeAvailable(Cafe: Cafe): boolean {
    return Cafe.stock > 0;
}