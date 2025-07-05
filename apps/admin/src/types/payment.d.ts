declare module 'payment' {
    // Базовые типы, можно дополнить по мере необходимости
    export type Focused = 'number' | 'name' | 'expiry' | 'cvc' | undefined;

    interface PaymentFns {
        cardType(val: string, lenient?: boolean): string | undefined;
        formatCardNumber(val: string): string;
        validateCardNumber(val: string): boolean;
        validateCardExpiry(month: string, year?: string): boolean;
        validateCardCVC(cvc: string, type?: string): boolean;
        cardExpiryVal(month: string, year?: string): { month: number | null; year: number | null };
    }

    const payment: {
        fns: PaymentFns;
        formatCardNumber(val: string): string;
        formatCardExpiry(val: string): string;
        formatCardCVC(val: string): string;
        validateCardNumber(val: string): boolean;
        validateCardExpiry(month: string, year?: string): boolean;
        validateCardCVC(cvc: string, type?: string): boolean;
        cardType(val: string, lenient?: boolean): string | undefined;
        cardExpiryVal(val: string | HTMLInputElement): { month: number | null; year: number | null };
    };

    export default payment;
} 