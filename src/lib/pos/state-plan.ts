export const posStatePlan = {
  cache: {
    strategy: "react-query",
    queryKeys: {
      users: ["pos", "users"],
      userDetail: (id: string) => ["pos", "users", id],
      inventory: ["pos", "inventory"],
      inventoryDetail: (id: string) => ["pos", "inventory", id],
      transactions: ["pos", "transactions"],
      transactionDetail: (id: string) => ["pos", "transactions", id],
      transactionItems: (transactionId: string) => ["pos", "transactions", transactionId, "items"],
      gamificationLogs: (userId: string) => ["pos", "users", userId, "logs"],
    },
  },
  stores: {
    ui: {
      source: "zustand",
      slices: ["filters", "checkoutDraft", "posSession"],
    },
  },
  relations: {
    userTransactions: "users -> transactions (one-to-many)",
    transactionItems: "transactions -> transaction_items (one-to-many)",
    userLogs: "users -> gamification_logs (one-to-many)",
  },
} as const;
