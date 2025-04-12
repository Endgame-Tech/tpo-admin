import { Link, useNavigate } from "react-router";
import {
 ArrowLeftEndOnRectangleIcon,
 ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useAuth } from "@/context/AuthContexts";
import { forwardRef } from "react";

type AuthButtonProps = {};

const AuthButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AuthButtonProps>((_, ref) => {
 const navigate = useNavigate();
 const { user, signOut } = useAuth();

 async function handleSignOut() {
   const ok = await signOut();
   if (ok) {
     navigate("/auth/login");
   }
 }

 if (!!user) {
   return (
     <button
       ref={ref as React.Ref<HTMLButtonElement>}
       className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
       onClick={handleSignOut}
     >
       <ArrowLeftEndOnRectangleIcon className="size-4  fill-accent-green" />
       Logout
     </button>
   );
 }

 return (
   <Link
     ref={ref as React.Ref<HTMLAnchorElement>}
     to={"/auth/login"}
     className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
   >
     <ArrowRightEndOnRectangleIcon className="size-4  fill-accent-green" />
     Login
   </Link>
 );
});

AuthButton.displayName = 'AuthButton';

export default AuthButton;