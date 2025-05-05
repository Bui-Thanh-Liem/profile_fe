import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import { ReactNode } from "react";
import "./myCarousel.css";

const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="custom-arrow custom-prev-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      cursor: "pointer",
      background: "#f3f4f6",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
    }}
  >
    <LeftOutlined style={{ fontSize: 20 }} />
  </div>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="custom-arrow custom-next-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      cursor: "pointer",
      background: "#f3f4f6",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
    }}
  >
    <RightOutlined style={{ fontSize: 20 }} />
  </div>
);

export function MyCarousel({ children }: { children: ReactNode }) {
  return (
    <Carousel
      arrows
      autoplay
      autoplaySpeed={3000}
      draggable
      className="h-[70vh]"
      prevArrow={<CustomPrevArrow />}
      nextArrow={<CustomNextArrow />}
      // dots={{ className: "custom-dots" }}
    >
      {children}
    </Carousel>
  );
}
