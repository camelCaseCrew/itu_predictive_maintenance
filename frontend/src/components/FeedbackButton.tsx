import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button'

function FeedbackButton (props:{ src: string, className:string, testid:string, id:string}) {
  const [src, setSrc] = useState(props.src);
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch(`/api/user_feedback?id=${props.id}`);
    const data : number = await response.json();
    if (data == 0) {
      setSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png")
    }
  };
  
  return <Button className={props.className} onClick={handleClick} data-testid={props.testid}>
    <Image width={40} height={40} priority={true} alt="logo" src={src} className="h-2rem"></Image>
  </Button>
};

export default FeedbackButton;