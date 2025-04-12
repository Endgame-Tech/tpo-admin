import {  useEffect, useState } from "react";
import TextInput from "@/components/inputs/TextInput";
import { useToast } from "@/components/Toast";
import { supabase } from "@/lib/supabaseClient";

import BackButton from "@/components/buttons/BackButton";
import { useNavigate, useParams } from "react-router";


export default function EditResource() {
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
  const { id } = useParams();

  useEffect(() => {
    async function getResource() {
      const { data, error } = await supabase
        .from("resources")
        .select()
        .eq("resource_id", id).single();

      if (error) {
        addToast(`Error: Failed to get resource`, "error");
        console.error(error.message);
        return;
      }

      setResource(data)
    }
    getResource();
  }, []);

  function updateResource(data: any) {
    let newResource = {
      ...resource,
      ...data,
    };
    setResource(newResource);
  }

  async function UpdateResource() {
    const {  error } = await supabase
      .from("resources")
      .update(resource)
      .eq("resource_id", resource.resource_id)
      .select();

    if (error) {
      addToast(`Error: ${error.message}`, "error");
      return;
    }
    
    navigate("/dashboard/resources");
    addToast(`Resource Updated Successfully!`, "success");
  }

  return (
    <>
      <BackButton className="w-fit" />
      <div className=" space-y-4 border-2 border-accent-green/20  p-8 bg-background-dark  rounded-lg ">
        <h2 className=" text-white text-2xl">Update Resource</h2>
        <h4 className={" text-white "}>
          Please fill out the form below to update the resource details.
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
            onClick={() => UpdateResource()}
            className="flex items-center gap-2 rounded-lg py-1.5 px-3 bg-accent-green  hover:scale-95  duration-300 delay-100 dark:text-text-dark  "
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
