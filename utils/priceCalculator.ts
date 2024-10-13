export function priceCalculator(roomPrice: number, days: number): number {
    const tax = 0.11;
    const serviceFee = 0.1;
    const totalPrice = roomPrice * days;

    return (totalPrice * tax) + (totalPrice * serviceFee) + totalPrice;
}