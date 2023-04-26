import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function ImageButton (props:{ src:string, alt:string, href:string, className:string }) {

  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push(props.href);
  };
  
  return <div className={props.className} onClick={handleClick} role="button">
  <Image src={props.src} alt={props.alt} width={40} height={40} />
</div>
};

export default ImageButton;