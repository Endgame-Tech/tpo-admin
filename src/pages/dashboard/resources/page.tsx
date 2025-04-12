import { Outlet } from "react-router";
import { ResourceTableProvider } from "@/context/ResourceTableContext";

export default function ResourcesLayout() {
  return (
    <ResourceTableProvider>
      <div className="w-full bg-[#00000020] p-4 rounded-xl">
        <div className="grid gap-4">
          {/* <p className="text-white text-2xl">Resources</p> */}
          <Outlet />
        </div>
      </div>
    </ResourceTableProvider>
  );
}
