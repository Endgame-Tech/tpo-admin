import { Navigate, Outlet, useLocation } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Spinning4Squares } from "@/components/loading/Loading";
import { useAdminCheck } from "@/hooks/useAdminCheck";

export default function DashboardLayout() {
  const { pathname } = useLocation() as {
    pathname: "/dashboard" | "/dashboard/analytics" | "/dashboard/resources";
  };
  const { isAdmin, isLoading } = useAdminCheck();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#232323]">
        <Spinning4Squares />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className={`grid md:grid-cols-[auto,_1fr] min-h-screen font-poppins bg-[#232323]`}
    >
      <Sidebar pathname={pathname} />

      <div className="grid grid-rows-[auto,_1fr,_auto] h-screen">
        <Header pathname={pathname} />
        <main className="flex flex-col items-center p-4 md:p-10  bg-[#2B2B2B] overflow-y-auto    rounded-tl-xl gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
