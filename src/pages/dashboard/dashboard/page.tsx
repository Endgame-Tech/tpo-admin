import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import {
  DeactivatedAccountsCard,
  UsersCard,
  VolunteerCard,
  VotersCard,
} from "./components/overviewCards";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UserTableProvider } from "@/context/UserTableContexts";
import UserSection from "./components/UserSection";

export default function Dashboard() {
  const [profileData, setProfileData] = useState<any[] | null>([]);

  useEffect(() => {
    async function getProfileData() {
      const { data, error } = await supabase.from("profile").select();

      if (error) {
        console.log(error);
      }
      setProfileData(data || null);
    }

    getProfileData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="grid gap-4 grid-cols-fluid-sm ">
          <UsersCard data={profileData} />
          <VotersCard data={profileData} />
          <VolunteerCard data={profileData} />
          <DeactivatedAccountsCard data={profileData} />
        </div>
      </div>

      <div className="w-full bg-[#00000020] p-4 rounded-xl">
        <UserTableProvider>
          <UserSection />
        </UserTableProvider>
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
