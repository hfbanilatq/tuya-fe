import { Product } from "./product";

export class Simulation {
    id?: number;
    numberOfInstallments: number;
    products: Product[]
    userId: number;
    createdAt: Date;
    creditCardId: number;
    creditCardName?: string;
}

