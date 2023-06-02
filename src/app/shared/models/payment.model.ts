export interface Payment {
  refersTo: { id: number, name: string } | null | undefined,
  paidBy: { firstName: string, lastName: string } | null | undefined,
  anonymously: boolean,
  amount: number
}
