import ButtonPrimary from "@/components/elements/ButtonPrimary";
import {
  CheckCircleOutlined,
  DesktopOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";
import { useEffect, useState } from "react";

export function NotCompatibleLayout() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6 pt-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
            <DesktopOutlined style={{ color: "red", fontSize: 60 }} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Not compatible with device
        </h1>

        <div className="h-1 w-20 bg-red-500 mx-auto mb-8"></div>

        <p className="text-lg text-gray-700 mb-6">
          This site is optimized for screens with a resolution of 1200px or
          higher. Currently, your screen resolution is{" "}
          <span className="font-semibold text-red-500">{windowWidth}px</span>.
        </p>

        <Alert
          className="mb-8"
          message={
            <div className="flex justify-center items-center gap-1">
              <InfoCircleOutlined
                style={{ color: "#3b82f6", fontSize: 20, marginRight: 8 }}
              />
              <h2 className="text-xl font-semibold text-gray-800">
                Why is there this notice?
              </h2>
            </div>
          }
          description="Our content and user experience are optimized for large screens to
            ensure you get the best possible experience of the full range of
            features and interface."
          type="warning"
        />

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Proposed solution:
          </h3>
          <ul className="space-y-3 text-left max-w-md mx-auto">
            <li className="flex items-center gap-2">
              <CheckCircleOutlined style={{ color: "green", fontSize: 16 }} />
              <span className="text-gray-700">Access by desktop or laptop</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleOutlined style={{ color: "green", fontSize: 16 }} />
              <span className="text-gray-700">
                Use a device with a screen larger than 1200px
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleOutlined style={{ color: "green", fontSize: 16 }} />
              <span className="text-gray-700">
                Rotate device to landscape mode (if possible)
              </span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <ButtonPrimary
            size="large"
            icon={<SyncOutlined style={{ fontSize: 16, marginRight: 8 }} />}
          >
            Reload the page
          </ButtonPrimary>
          <ButtonPrimary
            color="default"
            variant="filled"
            size="large"
            icon={
              <QuestionCircleOutlined
                style={{ fontSize: 16, marginRight: 8 }}
              />
            }
          >
            Learn more
          </ButtonPrimary>
        </div>
      </div>

      <div className="mt-8 text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} | Contact support:
          buithanhliem5073@gmail.com
        </p>
      </div>
    </div>
  );
}
