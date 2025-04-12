import { useAuth } from "@/context/AuthContexts";
// import { Link } from "react-router";
import { forwardRef } from "react";

type ProfileLinkProps = {};

// Change to default export if it's the only component in the file
const ProfileLink = forwardRef<HTMLAnchorElement, ProfileLinkProps>(() => {
  const { user } = useAuth();

  return (
    <div
      // ref={ref}
      // to={"/profile"}
      className="group grid grid-cols-[auto,1fr] w-full items-center gap-2 rounded-lg py-1.5 px-3   duration-300 delay-100 dark:text-text-dark  text-text-light"
    >
      <div className="flex justify-center items-center rounded bg-accent-green w-[25px] h-[25px]  font-base text-white  duration-300 capitalize">
        {user?.email?.[0]}
      </div>
      <div>
        <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis text-xs opacity-75">
          {user?.email}
        </p>
      </div>
    </div>
  );
});

ProfileLink.displayName = 'ProfileLink';

export default ProfileLink;