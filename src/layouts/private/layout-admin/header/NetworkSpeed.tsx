// app/network-speed.tsx
"use client";
import { SignalFilled } from "@ant-design/icons";
import { Space, Tag } from "antd";
import { useEffect, useState } from "react";

export default function NetworkSpeed() {
  const [typeNetwork, setTypeNetwork] = useState("");
  const [speed, setSpeed] = useState(0); // Tốc độ (Mbps)
  const [networkDelay, setNetworkDelay] = useState(0); // Độ trễ (ms)
  const [signalStatus, setSignalStatus] = useState(""); // Trạng thái tín hiệu
  const [signalColor, setSignalColor] = useState("#faad14"); // Màu tín hiệu

  useEffect(() => {
    if ("connection" in navigator) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const connection = navigator.connection as any;

      const updateNetworkStatus = () => {
        const newSpeed = connection?.downlink;
        const newDelay = connection?.rtt;
        setSpeed(newSpeed);
        setNetworkDelay(newDelay);
        setTypeNetwork(connection?.effectiveType);

        // Logic xác định trạng thái tín hiệu
        let status = "Medium Signal";
        let color = "#faad14"; // Màu vàng (bình thường) là mặc định

        // Kết hợp tốc độ và độ trễ để xác định trạng thái
        if (newSpeed < 2 || newDelay > 200) {
          status = "Weak Signal";
          color = "#ff4d4f";
        } else if (newSpeed > 10 && newDelay < 50) {
          status = "Strong Signal";
          color = "#52c41a";
        }

        setSignalStatus(status);
        setSignalColor(color);
      };

      // Cập nhật lần đầu
      updateNetworkStatus();

      // Lắng nghe sự thay đổi kết nối
      connection.addEventListener("change", updateNetworkStatus);
    } else {
      console.log("Navigator.connection is not supported in this browser.");
    }
  }, []);

  return (
    <Space>
      <SignalFilled style={{ color: signalColor, fontSize: "20px" }} />
      <Tag color="gold" style={{ margin: 0 }}>
        {signalStatus || "Unknown Signal"} ({typeNetwork})
      </Tag>
      <Tag color="gold" style={{ margin: 0 }}>
        {speed} Mbps
      </Tag>
      <Tag color="gold" style={{ margin: 0 }}>
        {networkDelay} ms
      </Tag>
    </Space>
  );
}
