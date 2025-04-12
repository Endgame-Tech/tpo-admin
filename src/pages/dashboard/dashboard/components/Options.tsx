import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import ChangeRolePopUp from "./ChangeRolePopUp";
import ProfilePopUp from "./ProfilePopUp";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/Toast";
import { useUserTableStore } from "@/context/UserTableContexts";

export default function Options({ profile }: ObjectType) {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(profile?.is_verified_user);
  const { fetchProfiles } = useUserTableStore();

  async function verifyUser() {
    setIsLoading(true);
    const { error, data } = await supabase
      .from("profile")
      .update({ is_verified_user: !isVerified })
      .eq("user_id", profile?.user_id)
      .select("is_verified_user")
      .single();

    if (error) {
      console.error("Error updating role:", error);
      setIsLoading(false);
      addToast(`Error updating role:${error.message}`, "error");
      return;
    }

    fetchProfiles();
    setIsVerified(data?.is_verified_user);
    setIsLoading(false);
    addToast(`Change successfully`, "success");
  }
  return (
    <div className=" text-right">
      <Menu>
        <MenuButton className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-white/10 hover:text-accent-foreground h-8 w-8 p-0">
          <EllipsisVerticalIcon className="size-6" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-black/10 bg-white p-1 text-sm/6 text-black/80  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 font-poppins dark:bg-background-dark text-white dark:border-background-light/10 mt-2"
        >
          <MenuItem>
            <ChangeRolePopUp profileId={profile.user_id} />
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <ProfilePopUp profile={profile} />
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button
              onClick={() => verifyUser()}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
            >
              {isLoading ? (
                "Loading..."
              ) : isVerified ? (
                <>Unverify</>
              ) : (
                <>Verify</>
              )}
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
