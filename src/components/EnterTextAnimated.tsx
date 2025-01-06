"use client";
import { memo, useEffect, useRef, useState } from "react";

//
import { IPropEnterTextAnimated } from "@/interfaces/propsComponent.interface";

function EnterTextAnimated({ texts }: IPropEnterTextAnimated) {
  const [index, setIndex] = useState<number>(0);
  const [text, setText] = useState<string>(texts[index] || "");
  const [indexSlice, setIndexSlice] = useState<number>(0);

  const isChangeTextRef = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      setIndexSlice(() => {
        if (indexSlice === text.length - 1) {
          isChangeTextRef.current = true;
          return indexSlice - 1;
        }
        return indexSlice + 1;
      });
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <span>
      {text.slice(0, indexSlice)}
      <span className="inline-block w-[2px] h-4 animate-ping bg-primary"></span>
    </span>
  );
}

export default memo(EnterTextAnimated);
