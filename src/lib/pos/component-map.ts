export const posComponentMap = {
  users: ["UserProfile", "UserBadge", "UserActivity"],
  inventory: ["ProductList", "InventoryCard", "StockIndicator"],
  transactions: ["OrderForm", "OrderSummary", "PaymentMethodSelect"],
  transaction_items: ["OrderItemList", "OrderItemRow"],
  gamification_logs: ["UserProfile", "XpHistoryList", "XpLogItem"],
  relations: [
    "transactions + transaction_items => OrderCard + OrderItemList",
    "users + gamification_logs => UserProfile + XpHistoryList",
  ],
} as const;
