export function priceCalculator(roomPrice: number, days: number): number {
    const tax = 0.11;
    const serviceFee = 0.1;
    const totalPrice = roomPrice * days;

    const result = (totalPrice * tax) + (totalPrice * serviceFee) + totalPrice;

    return Number(result.toFixed(0));
}