import React from 'react';
import { useRouter } from 'next/router';

const ClickableIframe = (props: { src: string, redirectUrl: string, Id: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(props.redirectUrl);
  };

  return (
    <div className="mx-1 sm:mx-6 lg:mx-8 2xl:mx-14" id={props.Id} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <iframe className="w-24 sm:w-28 md:w-32 lg:w-48 2xl:w-60 h-52 md:h-64 lg:h-80" src={props.src}></iframe>
    </div>
  );
};

export default ClickableIframe;