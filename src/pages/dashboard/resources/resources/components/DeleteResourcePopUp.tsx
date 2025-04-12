import { useToast } from "@/components/Toast";
import { useResourceTableStore } from "@/context/ResourceTableContext";
import { supabase } from "@/lib/supabaseClient";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useState, forwardRef } from "react";

type DeleteResourcePopUpProps = {
  resource: ResourceType;
};

const DeleteResourcePopUp = forwardRef<HTMLDivElement, DeleteResourcePopUpProps>(
  ({ resource }, _) => {
    let [isOpen, setIsOpen] = useState(false);
    const { addToast } = useToast();
    const { fetchResources } = useResourceTableStore();

    async function DeleteResource() {
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("resource_id", resource.resource_id);

      if (error) {
        addToast(`Error: ${error.message}`, "error");
        return;
      }
      fetchResources();
      addToast(`Resource Deleted Successfully!`, "success");
      setIsOpen(false);
    }

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-red-600/20  duration-300 delay-100 dark:text-red-400 dark:hover:text-red-300 w-full   text-text-light hover:text-red-600"
        >
          <TrashIcon className="size-4"/>
          <span>Delete Resource</span>
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/40 font-poppins">
            <DialogPanel className="space-y-4 border-2 border-accent-green/20  p-8 bg-background-dark  rounded-lg">
              <DialogTitle className="text-white text-xl">Delete Resource</DialogTitle>
              <Description className="text-white">
                Are you sure you want to delete this resource?
              </Description>

              <div className="flex gap-4 text-white">
                <button
                  onClick={DeleteResource}
                  className="group flex items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-accent-green/70 text-text-light"
                >
                  Yes
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

// Add a display name for better debugging
DeleteResourcePopUp.displayName = 'DeleteResourcePopUp';

export default DeleteResourcePopUp;