// utils/errorTypes.ts
export class OutOfStockError extends Error {
    constructor(public coffeeId: number) {
        super(`Le café ${coffeeId} est en rupture de stock`);
    }
}