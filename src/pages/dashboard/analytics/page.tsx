import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { UsersCard } from "../dashboard/components/overviewCards";
import { StateChartComp } from "./components/StateChartComp";
import PivotTable from "./components/PivotTable";
import SelectPivotColumns from "./components/SelectPivotColumns";
import SelectChartColumns from "@/pages/dashboard/analytics/components/SelectChartColumns";
import { ChartProvider } from "@/context/ChartContext";
import { UserTableProvider } from "@/context/UserTableContexts";

export default function Analytics() {
  const [profileData, setProfileData] = useState<any[] | null>([]);

  useEffect(() => {
    async function getProfileData() {
      const { data } = await supabase.from("profile").select();
      setProfileData(data || null);
    }

    getProfileData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="grid gap-4 grid-cols-fluid-sm ">
          <UsersCard data={profileData} />
        </div>
      </div>

      <div className="w-full bg-[#00000020] p-4 rounded-xl">
        <UserTableProvider>
          <div className="grid gap-4">
            <p className="text-white text-2xl">Pivot Table</p>
            <div className="bg-accent-orange h-[1px] w-full"></div>
            <div className="flex  justify-between items-end flex-wrap border-b-2 border-accent-green/50 py-4 ">
              <SelectPivotColumns />
            </div>
            <PivotTable />
          </div>
        </UserTableProvider>
      </div>
      <div className="w-full bg-[#00000020] p-4 rounded-xl">
        <ChartProvider>
          <div className="grid gap-4">
            <p className="text-white text-2xl">View User Chart</p>
            <div className="bg-accent-orange h-[1px] w-full"></div>
            <div className="flex  justify-between items-end flex-wrap border-b-2 border-accent-green/50 py-4 ">
              <SelectChartColumns />
            </div>
            <StateChartComp />
          </div>
        </ChartProvider>
      </div>
    </>
  );
}

export function Card({
  title = "",
  icon = <Cog6ToothIcon className="size-6 text-black" />,
  mainStats = "",
  subStats = "",
}) {
  return (
    <div className="bg-[#00000030] rounded-lg p-4 text-white flex flex-col gap-4">
      <div className="flex justify-between">
        <p>{title}</p>
        <div className="p-1 bg-[#2DB475] text-black rounded-full grid place-content-center">
          {icon}
        </div>
      </div>
      <p className="text-4xl text-[#2DB475]">{mainStats}</p>
      <div className="text-xs text-[#B5B5B5]">{subStats}</div>
    </div>
  );
}
