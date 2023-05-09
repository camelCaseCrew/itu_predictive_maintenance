import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function FeedbackButton (props:{ src:string, alt:string, href:string, className:string, testid:string, id:string}) {

  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch(`/api/user_feedback?id=${props.id}`);
    const data = await response.json();
  };
  
  return <div id="feedback-button" className={props.className} onClick={handleClick} data-testid={props.testid} role="button">
  <Image src={props.src} alt={props.alt} width={40} height={40} />
</div>
};

export default FeedbackButton;