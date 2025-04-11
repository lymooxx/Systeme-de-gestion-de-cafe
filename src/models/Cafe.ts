import { Ingredient } from './Ingredient';

export class Cafe {
    constructor(
        public idCafe: number,
        public nom: string,
        public prixBase: number,
        public ingredients: Ingredient[] = []
    ) {}
}
