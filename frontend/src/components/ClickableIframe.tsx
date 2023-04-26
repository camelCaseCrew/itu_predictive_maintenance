import React from 'react';
import { useRouter } from 'next/router';

const ClickableIframe = (props: { src: string, redirectUrl: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(props.redirectUrl);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <iframe src={props.src} ></iframe>
    </div>
  );
};

export default ClickableIframe;