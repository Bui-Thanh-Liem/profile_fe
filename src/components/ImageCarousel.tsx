"use client";
import { IPropImageCarousel } from "@/interfaces/propsComponent.interface";
import { Carousel, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";

//
export const ImageCarousel = ({ images, alt }: IPropImageCarousel) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="w-40 h-40 relative mt-10">
        <Image
          fill
          alt={alt}
          src={images[0]}
          onClick={(e) => {
            setVisible(true);
            e.preventDefault();
            e.stopPropagation();
          }}
          className="cursor-pointer object-contain"
          unoptimized
        />
      </div>
      <Modal
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width={800}
        centered
        className="p-3"
        closeIcon={null}
      >
        <Carousel
          infinite
          arrows
          autoplay={{ dotDuration: true }}
          autoplaySpeed={3000}
          draggable
        >
          {images.map((src, index) => (
            <div key={index} className="relative w-[600px] h-[600px]">
              <Image
                fill
                src={src}
                alt={`carousel-${index}`}
                className="object-contain cursor-grab"
                unoptimized
              />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
};
