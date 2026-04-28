import type {
  GamificationLog,
  Inventory,
  Transaction,
  TransactionItem,
  User,
  TransactionWithItems,
  UserWithLogs,
} from "@/lib/pos/schema";

export type ApiError = {
  message: string;
  code?: string;
};

export type ApiResponse<T> = {
  data: T;
  error: ApiError | null;
};

export type UsersResponse = ApiResponse<User[]>;
export type UserResponse = ApiResponse<User>;
export type UserDetailResponse = ApiResponse<UserWithLogs>;

export type InventoryResponse = ApiResponse<Inventory>;
export type InventoriesResponse = ApiResponse<Inventory[]>;

export type TransactionResponse = ApiResponse<Transaction>;
export type TransactionsResponse = ApiResponse<Transaction[]>;
export type TransactionDetailResponse = ApiResponse<TransactionWithItems>;

export type TransactionItemResponse = ApiResponse<TransactionItem>;
export type TransactionItemsResponse = ApiResponse<TransactionItem[]>;

export type GamificationLogResponse = ApiResponse<GamificationLog>;
export type GamificationLogsResponse = ApiResponse<GamificationLog[]>;

export type CreateUserRequest = Pick<User, "full_name" | "phone_number" | "role">;
export type UpdateUserRequest = Partial<Pick<User, "full_name" | "phone_number" | "role" | "total_xp" | "streak_count" | "last_login_date">>;

export type CreateInventoryRequest = Pick<Inventory, "name" | "category" | "barcode" | "price" | "stock" | "type">;
export type UpdateInventoryRequest = Partial<CreateInventoryRequest>;

export type CreateTransactionRequest = Pick<Transaction, "customer_id" | "cashier_id" | "total_amount" | "method">;
export type UpdateTransactionRequest = Partial<CreateTransactionRequest>;

export type CreateTransactionItemRequest = Pick<TransactionItem, "transaction_id" | "inventory_id" | "quantity" | "price_at_transaction">;
export type UpdateTransactionItemRequest = Partial<CreateTransactionItemRequest>;

export type CreateGamificationLogRequest = Pick<GamificationLog, "user_id" | "xp_added" | "description">;
export type UpdateGamificationLogRequest = Partial<CreateGamificationLogRequest>;

export type EndpointSpec = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  response: string;
  request?: string;
};

export const posEndpoints: EndpointSpec[] = [
  { method: "GET", path: "/api/pos/users", response: "UsersResponse" },
  { method: "GET", path: "/api/pos/users/:id", response: "UserDetailResponse" },
  { method: "POST", path: "/api/pos/users", request: "CreateUserRequest", response: "UserResponse" },
  { method: "PATCH", path: "/api/pos/users/:id", request: "UpdateUserRequest", response: "UserResponse" },
  { method: "DELETE", path: "/api/pos/users/:id", response: "UserResponse" },

  { method: "GET", path: "/api/pos/inventory", response: "InventoriesResponse" },
  { method: "GET", path: "/api/pos/inventory/:id", response: "InventoryResponse" },
  { method: "POST", path: "/api/pos/inventory", request: "CreateInventoryRequest", response: "InventoryResponse" },
  { method: "PATCH", path: "/api/pos/inventory/:id", request: "UpdateInventoryRequest", response: "InventoryResponse" },
  { method: "DELETE", path: "/api/pos/inventory/:id", response: "InventoryResponse" },

  { method: "GET", path: "/api/pos/transactions", response: "TransactionsResponse" },
  { method: "GET", path: "/api/pos/transactions/:id", response: "TransactionDetailResponse" },
  { method: "POST", path: "/api/pos/transactions", request: "CreateTransactionRequest", response: "TransactionResponse" },
  { method: "PATCH", path: "/api/pos/transactions/:id", request: "UpdateTransactionRequest", response: "TransactionResponse" },
  { method: "DELETE", path: "/api/pos/transactions/:id", response: "TransactionResponse" },

  { method: "GET", path: "/api/pos/transaction-items", response: "TransactionItemsResponse" },
  { method: "POST", path: "/api/pos/transaction-items", request: "CreateTransactionItemRequest", response: "TransactionItemResponse" },
  { method: "PATCH", path: "/api/pos/transaction-items/:id", request: "UpdateTransactionItemRequest", response: "TransactionItemResponse" },
  { method: "DELETE", path: "/api/pos/transaction-items/:id", response: "TransactionItemResponse" },

  { method: "GET", path: "/api/pos/gamification-logs", response: "GamificationLogsResponse" },
  { method: "POST", path: "/api/pos/gamification-logs", request: "CreateGamificationLogRequest", response: "GamificationLogResponse" },
  { method: "DELETE", path: "/api/pos/gamification-logs/:id", response: "GamificationLogResponse" },
];
