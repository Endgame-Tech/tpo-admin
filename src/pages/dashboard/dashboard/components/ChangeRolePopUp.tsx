import { SpinningArrow } from "@/components/loading/Loading";
import Select from "@/components/select/Select";
import { useToast } from "@/components/Toast";
import { roleOptions } from "@/constants";
import { supabase } from "@/lib/supabaseClient";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, forwardRef } from "react";

type ChangeRolePopUpProps = {
  profileId: string;
};

const ChangeRolePopUp = forwardRef<HTMLDivElement, ChangeRolePopUpProps>(
  ({  profileId }, _) => {
    const { addToast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    function onChangeRole(value: SelectOptionType) {
      setRole(value.value);
    }

    async function saveChanges() {
      setIsLoading(true);

      const { error } = await supabase
        .from("user_roles")
        .update({ role: role })
        .eq("user_id", profileId)
        .select();

      if (error) {
        console.error("Error updating role:", error);
        setIsLoading(false);
        setIsOpen(false);
        addToast(`Error updating role:${error.message}`, "error");
        return;
      }


      setIsLoading(false);
      setIsOpen(false);
      addToast("Role Updated Successfully", "success");
    }

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
        >
          Change Role
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 "
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/40">
            <DialogPanel className="max-w-2xl w-[80%] space-y-4 border-2 border-accent-green/20  p-8 bg-background-dark  rounded-lg">
              <DialogTitle className="font-bold text-white">
                Change Role
              </DialogTitle>
              <Description className={`text-white`}>
                This will change the user's role.
              </Description>
              <Select options={roleOptions} onChange={onChangeRole} />
              <div className="flex gap-4 justify-between">
                <button
                  onClick={saveChanges}
                  className="flex items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
                >
                  {isLoading ? <SpinningArrow /> : <span>Save</span>}
                </button>
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
ChangeRolePopUp.displayName = 'ChangeRolePopUp';

export default ChangeRolePopUp;