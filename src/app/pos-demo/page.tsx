import { MotionSection } from "@/components/motion/MotionSection";
import { OrderForm } from "@/components/pos/OrderForm";
import { ProductList } from "@/components/pos/ProductList";
import { UserProfile } from "@/components/pos/UserProfile";
import type { Inventory, UserWithLogs } from "@/lib/pos/schema";

const SAMPLE_INVENTORY: Inventory[] = [
  {
    id: "inv-1",
    name: "Board Game Cafe Rental",
    category: "Cafe",
    barcode: "BC-001",
    price: 45000,
    stock: 12,
    type: "CAFE_RENTAL",
    created_at: null,
  },
  {
    id: "inv-2",
    name: "Math Adventure Kit",
    category: "Edukasi",
    barcode: "BC-004",
    price: 125000,
    stock: 4,
    type: "ONLINE_SALES",
    created_at: null,
  },
  {
    id: "inv-3",
    name: "Logic Quest Cards",
    category: "Retail",
    barcode: "BC-008",
    price: 89000,
    stock: 18,
    type: "ONLINE_SALES",
    created_at: null,
  },
];

const SAMPLE_USER: UserWithLogs = {
  id: "user-1",
  full_name: "Aulia Pratama",
  phone_number: "081234567890",
  role: "CUSTOMER",
  total_xp: 320,
  streak_count: 6,
  last_login_date: "2026-04-26",
  created_at: null,
  logs: [
    { id: "log-1", user_id: "user-1", xp_added: 24, description: "Pembelian kasir", created_at: null },
    { id: "log-2", user_id: "user-1", xp_added: 12, description: "Sewa ruang cafe", created_at: null },
    { id: "log-3", user_id: "user-1", xp_added: 30, description: "Workshop komunitas", created_at: null },
    { id: "log-4", user_id: "user-1", xp_added: 8, description: "Pembelian kasir", created_at: null },
  ],
};

export default function PosDemoPage() {
  return (
    <div className="bg-gray-50">
      <div className="container py-10 space-y-6">
        <MotionSection>
          <UserProfile user={SAMPLE_USER} />
        </MotionSection>
        <MotionSection>
          <OrderForm items={SAMPLE_INVENTORY} />
        </MotionSection>
        <MotionSection>
          <ProductList items={SAMPLE_INVENTORY} />
        </MotionSection>
      </div>
    </div>
  );
}
