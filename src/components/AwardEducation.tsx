"use client";
import { Badge } from "antd"; // required client

export function AwardEducation() {
  const awards = [
    {
      date: "10 / 2024",
      href: "https://itc.edu.vn/",
      label: "Graduated in Information Technology",
    },
    {
      date: "08 / 2022",
      href: "https://iuh.edu.vn/",
      label: "Graduated in Industrial Electricity",
    },
  ];

  return (
    <div className="flex text-white justify-center">
      <Badge.Ribbon text="Awards" placement="start" color="red">
        <div className="bg-primary p-4 rounded-lg">
          <h2 className="text-center text-xl font-bold text-white mb-6">
            Certifications
          </h2>

          {awards?.map((award) => (
            <div key={award.href} className="mb-4">
              <span className="text-lg">{award.date}</span> -{" "}
              <a
                href={award.href}
                target="_blank"
                className="text-lg text-yellow-300 font-bold hover:underline hover:text-yellow-300"
              >
                {award.label}
              </a>
            </div>
          ))}
        </div>
      </Badge.Ribbon>
    </div>
  );
}
