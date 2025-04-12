import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ProfileLink  from "./Links";
import AuthButton from "./buttons/AuthButton";
// import ToggleButton from "./buttons/ToggleButton";
import { useAuth } from "@/context/AuthContexts";
import { Link } from "react-router";

export default function DropdownMenu() {
  const {user} = useAuth()

  return (
    <div className=" text-right">
      <Menu>
        <MenuButton className="flex justify-center items-center rounded-full bg-accent-green py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:scale-95 data-[open]:bg-accent-green duration-300 data-[focus]:outline-1 data-[focus]:outline-white capitalize w-[30px] h-[30px]">
        {user?.email?.[0]}
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-black/10 bg-white p-1 text-sm/6 text-black/80  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 font-poppins dark:bg-background-dark dark:border-background-light/10 mt-2"
        >
          <MenuItem>
            <ProfileLink />
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
    
          <MenuItem>
            <Link to={'/dashboard'}  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light">
            Dashboard
            </Link>
        
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <AuthButton/>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
