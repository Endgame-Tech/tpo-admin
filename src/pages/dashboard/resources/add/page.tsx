import BackButton from "@/components/buttons/BackButton";
import TextInput from "@/components/inputs/TextInput";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddResource() {
  const defaultResource = {
    title: null,
    sub_title: null,
    author: null,
    images_url: null,
    resource_url: null,
    permissions: null,
  };

  const [resource, setResource] = useState<ResourceType>(defaultResource);
  const { addToast } = useToast();
  const navigate = useNavigate();

  function updateResource(data: any) {
    let newResource = {
      ...resource,
      ...data,
    };
    setResource(newResource);
  }

  async function UploadResource() {
    const { error } = await supabase.from("resources").insert(resource);

    if (error) {
      addToast(`Error: error creating resource`, "error");
      console.error(error.message);
      return;
    }
    setResource(defaultResource)
    navigate("/dashboard/resources");
    addToast(`Resource Created Successfully!`, "success");
  }

  return (
    <>
    <BackButton className="w-fit"/>
      <div className=" space-y-4 border-2 border-accent-green/20  p-8 bg-background-dark  rounded-lg ">
        <h2 className=" text-white">Add New Resources</h2>
        <h4 className={" text-white "}>
          Please fill out the form below to add new resources.
        </h4>
        <div className="text-white grid grid-cols-1 gap-4">
          <TextInput
            label="Title"
            value={resource?.title ?? undefined}
            type="text"
            placeholder="Enter Title"
            onChange={(evt) => {
              updateResource({ title: evt.target.value });
            }}
            required={true}
          />
          <TextInput
            label="Sub Title"
            value={resource?.sub_title ?? undefined}
            type="text"
            placeholder="Enter Sub Title"
            onChange={(evt) => {
              updateResource({ sub_title: evt.target.value });
            }}
          />

          <TextInput
            label="Author"
            value={resource?.author ?? undefined}
            type="text"
            placeholder="Enter Author"
            onChange={(evt) => {
              updateResource({ author: evt.target.value });
            }}
            required={true}
          />

          <TextInput
            label="Add link to resource"
            value={resource?.resource_url ?? undefined}
            type="text"
            placeholder="Enter resource"
            onChange={(evt) => {
              updateResource({ resource_url: evt.target.value });
            }}
            required={true}
          />
        </div>
        <div className="flex gap-4 text-white">
          <button
            onClick={() => UploadResource()}
            className="flex items-center gap-2 rounded-lg py-1.5 px-3 bg-accent-green  hover:scale-95  duration-300 delay-100 dark:text-text-dark  "
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
