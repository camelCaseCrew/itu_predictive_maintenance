import React from 'react';
import { useRouter } from 'next/router';
import { useGlobal } from '@/context/global';

const ClickableIframe = (props: { src: string, redirectUrl: string, Id: string }) => {
  const { filterInt, changeFilter } = useGlobal();
  const router = useRouter();

  const handleClick = () => {
    if (props.Id == "Healthy-goto-graph-id") {
      changeFilter(1)
    } else if (props.Id == "Risk-goto-graph-id") {
      changeFilter(2)
    } else if (props.Id == "Critical-goto-graph-id") {
      changeFilter(3)
    }
    router.push(props.redirectUrl);
  };

  return (
    <div className="mx-1 sm:mx-6 lg:mx-8 2xl:mx-14" id={props.Id} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <iframe className="w-24 sm:w-28 md:w-32 lg:w-48 2xl:w-60 h-52 md:h-64 lg:h-80" src={props.src}></iframe>
    </div>
  );
};

export default ClickableIframe;