import { IPropMyImage } from "@/interfaces/propsComponent.interface";
import { Carousel, Image as ImageAntd, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";

export const MyImage = ({ images, alt }: IPropMyImage) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ImageAntd
        height={200}
        alt={alt}
        src={images[0]}
        preview={false}
        onClick={() => setVisible(true)}
        className="cursor-pointer object-cover"
      />
      <Modal
        open={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width={800}
        centered
      >
        <Carousel infinite={false} arrows>
          {images.map((src, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <Image
                width={800}
                height={600}
                src={src}
                alt={`carousel-${index}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
};
