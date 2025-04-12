import React, { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient';

type ImageProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  bucketName: string;
  className?: string;
}
export default function Image({src, alt, fallbackSrc, bucketName, className=""}: ImageProps) {
  const [imageSrc, setImageSrc] = React.useState(src)
  useEffect(() => {
    getImage()
  }, [src])

 async function getImage() {
  
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(src);
 
      if (error) {
        console.error(error);
      } 
      const url = URL.createObjectURL(data as Blob);
      setImageSrc(url);
  }
  
  return (
    <>
      <img src={imageSrc} alt={alt} onError={() => setImageSrc(fallbackSrc)} className={`${className}`} />
    </>
  )
}
