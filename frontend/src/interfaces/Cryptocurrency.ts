export interface Cryptocurrency {
    id: number;
    name: string;
    symbol: string;
    price?: string;
    created_at?: Date;
    updated_at?: Date;
  }