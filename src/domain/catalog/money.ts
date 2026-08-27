/**
 * Dinheiro no domínio é sempre representado em centavos (inteiro).
 * A formatação em reais acontece somente na camada de apresentação.
 */

export type Currency = "BRL";

export type Money = {
  amountCents: number;
  currency: Currency;
};

export function toCents(value: number): number {
  return Math.round(value * 100);
}

export function fromCents(amountCents: number): number {
  return amountCents / 100;
}

export function formatCents(amountCents: number, currency: Currency = "BRL"): string {
  return fromCents(amountCents).toLocaleString("pt-BR", { style: "currency", currency });
}

export function discountPercent(currentCents: number, originalCents: number): number | null {
  if (!originalCents || originalCents <= currentCents) return null;
  return Math.round((1 - currentCents / originalCents) * 100);
}
