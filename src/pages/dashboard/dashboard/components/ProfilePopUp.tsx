import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, forwardRef } from "react";

type ProfilePopUpProps = {
  profile: ObjectType;
};

const ProfilePopUp = forwardRef<HTMLDivElement, ProfilePopUpProps>(
  ({ profile }, _) => {
    let [isOpen, setIsOpen] = useState(false);
    const visibleProfile = [
      { label: "Member Id", value: profile?.member_id },
      { label: "Gender", value: profile?.gender },
      {
        label: "State of Political Engagement",
        value: profile?.voting_engagement_state,
      },
      { label: "Referral Code", value: profile?.referral_code },
      { label: "Email", value: profile?.email },
      { label: "Position", value: profile?.position },
    ];

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
        >
          View Profile
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/40 font-poppins">
            <DialogPanel className="w-[80%] space-y-4 border-2 border-accent-green/20  p-8 bg-background-dark  rounded-lg">
              <DialogTitle className="text-white">
                User Profile
              </DialogTitle>
              <Description className="text-white text-2xl font-semibold">
                {profile?.first_name} {profile?.middle_name} {profile?.last_name}
              </Description>
              <div className="text-white grid grid-cols-fluid gap-4">
                {visibleProfile.map((info, index) => (
                  <div key={index} className="border-2 border-accent-green/20 p-2 rounded-lg">
                    <label className="text-sm text-accent-green">{info.label}</label>
                    <p>{info.value}</p>
                  </div>
                ))}
                <p className=""></p>
              </div>
              <div className="flex gap-4 text-white">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-red-600/20  duration-300 delay-100 dark:text-text-dark dark:hover:text-red-300   text-text-light hover:text-red-600"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    );
  }
);

// Add display name for better debugging
ProfilePopUp.displayName = 'ProfilePopUp';

export default ProfilePopUp;