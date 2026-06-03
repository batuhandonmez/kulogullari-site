import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f1] py-8 md:py-12">
      <div className="site-container">
        <AdminDashboard />
      </div>
    </main>
  );
}
