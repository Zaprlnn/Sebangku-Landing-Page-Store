export type UserRole = "ADMIN" | "CASHIER" | "CUSTOMER";
export type InventoryType = "ONLINE_SALES" | "CAFE_RENTAL";
export type PaymentMethod = "CASH" | "DEBIT_CREDIT" | "QRIS";

export interface User {
  id: string;
  full_name: string;
  phone_number: string | null;
  role: UserRole | null;
  total_xp: number | null;
  streak_count: number | null;
  last_login_date: string | null;
  created_at: string | null;
}

export interface Inventory {
  id: string;
  name: string;
  category: string | null;
  barcode: string | null;
  price: number;
  stock: number | null;
  type: InventoryType;
  created_at: string | null;
}

export interface Transaction {
  id: string;
  customer_id: string | null;
  cashier_id: string | null;
  total_amount: number;
  method: PaymentMethod;
  created_at: string | null;
}

export interface TransactionItem {
  id: string;
  transaction_id: string | null;
  inventory_id: string | null;
  quantity: number;
  price_at_transaction: number;
}

export interface GamificationLog {
  id: string;
  user_id: string | null;
  xp_added: number;
  description: string;
  created_at: string | null;
}

export interface TransactionWithItems extends Transaction {
  items: TransactionItem[];
  customer?: User | null;
  cashier?: User | null;
}

export interface UserWithLogs extends User {
  logs: GamificationLog[];
}

export interface InventoryWithTransactions extends Inventory {
  transaction_items: TransactionItem[];
}
