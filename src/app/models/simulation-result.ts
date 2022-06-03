import { MonthlyFee } from "./monthly-fee";

export class SimulationResult {
    realPrice: number;
    promotionPrice: number;
    pricePaid: number;
    priceWithCreditCard: number;
    monthlyFees: MonthlyFee[];
}
