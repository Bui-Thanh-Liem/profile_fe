import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { FaRotate } from "react-icons/fa6";
import ButtonPrimary from "./elements/ButtonPrimary";
import { FaCheck } from "react-icons/fa";
import { IPropCaptcha } from "@/interfaces/propsComponent.interface";

const Captcha = ({ handleCheck }: IPropCaptcha) => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const isCheck = userInput.toLowerCase() === captcha.toLowerCase();
    setVerified(isCheck);
    handleCheck(isCheck);
  }, [userInput, captcha, handleCheck]);

  function generateCaptcha() {
    const length = 6;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptcha(result);
  }

  const renderCaptchaChar = (
    char: string,
    index: React.Key | null | undefined
  ) => {
    const noise = Array(5)
      .fill(null)
      .map(() => (
        <div
          key={Math.random()}
          className="absolute w-1 h-1 bg-gray-500 opacity-50"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ));

    return (
      <div key={index} className="relative inline-block mx-1 w-5 h-8">
        <span
          className={`absolute inset-0 text-2xl font-bold text-gray-800 transform`}
          style={{
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            transform: `rotate(${Math.random() * 60 - 30}deg) skew(${
              Math.random() * 20 - 10
            }deg)`,
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          {char}
        </span>
        {noise}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-gray-100 rounded-lg">
      {!verified ? (
        <>
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter CAPTCHA"
            size="large"
            className="w-36"
          />
          <div className="bg-white border border-gray-300 px-2 rounded select-none">
            {captcha.split("").map(renderCaptchaChar)}
          </div>
          <ButtonPrimary
            onClick={(e) => {
              e.preventDefault();
              generateCaptcha();
            }}
          >
            <FaRotate />
          </ButtonPrimary>
        </>
      ) : (
        <FaCheck color="green" className="m-auto" size={32} />
      )}
    </div>
  );
};

export default Captcha;
