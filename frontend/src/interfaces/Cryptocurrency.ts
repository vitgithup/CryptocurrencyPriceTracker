export interface Cryptocurrency {
    id: number;
    name: string;
    symbol: string;
    price?: number;
    created_at?: Date;
    updated_at?: Date;
  }