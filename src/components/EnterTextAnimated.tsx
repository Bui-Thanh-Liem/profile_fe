"use client";
import { memo, useEffect, useRef, useState } from "react";
import programer from "../../public/programer.png";
import frontend from "../../public/frontend.png";
import backend from "../../public/backend.png";

//
import { IPropEnterTextAnimated } from "@/interfaces/propsComponent.interface";
import Image from "next/image";

function EnterTextAnimated({ texts }: IPropEnterTextAnimated) {
  const images = [programer, frontend, backend];
  const [index, setIndex] = useState<number>(0);
  const [indexSlice, setIndexSlice] = useState<number>(0);
  const isDirectionLetter = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndexSlice(() => {
        //
        if (indexSlice === texts[index].length - 1) {
          isDirectionLetter.current = false;
        }

        //
        if (indexSlice === 0) {
          isDirectionLetter.current = true;
          setIndex(() => {
            if (index === texts.length - 1) {
              return 0;
            }
            return index + 1;
          });
        }

        //
        if (isDirectionLetter.current) {
          return indexSlice + 1;
        } else {
          return indexSlice - 1;
        }
      });
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [index, indexSlice, texts]);

  return (
    <span className="text-primary text-4xl inline-block">
      <Image
        className="inline-block"
        src={images[index]}
        alt={texts[index]}
        width={50}
        height={50}
      />{" "}
      {texts[index].slice(0, indexSlice)}
      <span className="inline-block w-[2px] h-4 animate-ping bg-primary"></span>
    </span>
  );
}

export default memo(EnterTextAnimated);
