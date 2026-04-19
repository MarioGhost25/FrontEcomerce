import { SidebarProvider } from "../../../../context/SidebarContext";
import { useSidebar } from "../../../../context/useSidebar";
import { Outlet } from "react-router";
import AdminHeader from "./AdminHeader";
import Backdrop from "./Backdrop";
import AdminSidebar from "./AdminSidebar";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AdminSidebar />
        <Backdrop />
      </div>
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"} ${isMobileOpen ? "ml-0" : ""}`}>
        <AdminHeader />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>);
};

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>);
};

export default AdminLayout;
