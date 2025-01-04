"use client";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

//
import { IPropEnterTextAnimated } from "@/interfaces/propsComponent.interface";

export default function EnterTextAnimated({ texts }: IPropEnterTextAnimated) {
  const [index, setIndex] = useState<number>(0);
  const [text, setText] = useState<string>(texts[index] || "");

  useEffect(() => {
    setText(texts[index]);
  }, [index]);

  return (
    <div>
      {text.split("").map((word, idx) => {
        const indexLast = text.length - 1;
        if (idx === indexLast) {
          setIndex(() => {
            if (index === texts.length - 1) return 0;
            return index + 1;
          });
        }
        return <span key={uuidV4()}>{word}</span>;
      })}
    </div>
  );
}
