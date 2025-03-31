"use client";
import { Badge } from "antd";

export function AwardEducation() {
  return (
    <div className="flex text-white justify-center">
      <Badge.Ribbon text="Awards" placement="start" color="red">
        <div className="bg-primary p-4">
          <h2 className="text-center text-xl font-bold text-white mb-6">
            Certifications
          </h2>
          <div className="mb-4">
            <span className="text-lg">08 / 2022</span> -{" "}
            <a
              href="https://iuh.edu.vn/"
              target="_blank"
              className="text-lg text-yellow-300 font-bold hover:underline hover:text-yellow-300"
            >
              Graduated in Industrial Electricity
            </a>
          </div>
          <div>
            <span className="text-lg">05 / 2024</span> -{" "}
            <a
              href="https://itc.edu.vn/"
              target="_blank"
              className="text-lg text-yellow-300 font-bold hover:underline hover:text-yellow-300"
            >
              Graduated in Information Technology
            </a>
          </div>
        </div>
      </Badge.Ribbon>
    </div>
  );
}
