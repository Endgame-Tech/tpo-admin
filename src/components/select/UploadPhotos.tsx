// import {  useState } from "react";
// // import { supabase } from "../../supabase";
// // import imageCompressor from "../../utils/ImageCompression";

// interface AvatarProps {
//   url: string | null;
//   size: number;
//   onUpload: (
//     event: React.ChangeEvent<HTMLInputElement>,
//     filePath: string
//   ) => void;
// }

// interface UploadAvatarEvent extends React.ChangeEvent<HTMLInputElement> {}

// export default function Avatar({ url, size, onUpload }: AvatarProps) {
//   const [uploading, setUploading] = useState(false);

//   async function uploadAvatar(event: UploadAvatarEvent) {
//     try {
//       setUploading(true);

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error("You must select an image to upload.");
//       }

//       const file = event.target.files[0];
//       const fileExt = file.name.split(".").pop();
//       const fileName = `${Math.random()}.${fileExt}`;
//       const filePath = `${fileName}`;
      
//       let {error: compressError, compressedFile} = await imageCompressor(file)

//       if (compressError) {
//         console.log(compressError);
//         throw compressError;
//       }

//       if(!compressedFile){
//         throw compressError;
//       }

//       let { error: uploadError } = await supabase.storage
//         .from("profile_pictures")
//         .upload(filePath, compressedFile);

        
//         if (uploadError) {
//         throw uploadError;
//       }

//       onUpload(event, filePath);
//     } catch (error) {
//       if (error instanceof Error) {
//         alert(error.message);
//       } else {
//         alert("An unknown error occurred");
//       }
//     } finally {
//       setUploading(false);
//     }
//   }

//     return (
//     <div className="flex flex-col gap-4 items-center">
//       <figure>
        
//       <img
//           src={url || "/photo.png"}
//           alt="Avatar"
//           className="w-24 h-24 object-cover rounded-full"
//           style={{ height: size, width: size }}
//         />
//       </figure>
//       <div className="w-full flex justify-center">  
//         <label className="p-2 w-full bg-secondary-dark text-white rounded-lg text-center cursor-pointer" htmlFor="single">
//           {uploading ? "Uploading ..." : "Upload"}
//         </label>
//         <input
//           style={{
//             visibility: "hidden",
//             position: "absolute",
//           }}
//           type="file"
//           id="single"
//           accept="image/*"
//           onChange={uploadAvatar}
//           disabled={uploading}
//         />
//       </div>
//     </div>
//   );
// }
