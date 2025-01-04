"use client";
import { useEffect, useState } from "react";

//
import { IPropEnterTextAnimated } from "@/interfaces/propsComponent.interface";

export default function EnterTextAnimated({ texts }: IPropEnterTextAnimated) {
  const [index, setIndex] = useState<number>(0);
  const [indexSlice, setIndexSlice] = useState<number>(0);
  const [text, setText] = useState<string>(texts[index] || "");

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log("asdfasdfsadfsdfds");

  //     setIndexSlice(indexSlice + 1);
  //   }, 500);
  // }, []);

  return (
    <span>
      {text.slice(0, indexSlice)}
      <span className="inline-block w-[2px] h-4 animate-ping bg-primary"></span>
    </span>
  );
}
