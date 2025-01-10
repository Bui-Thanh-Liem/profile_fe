import { IPropInputPassword } from "@/interfaces/propsComponent.interface";
import { Input } from "antd";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";

export default function InputPassword({ value, onChangePassword }: IPropInputPassword) {
  return (
    <div>
      <label htmlFor="password" className="text-base inline-block mb-[2px]">
        Password
      </label>
      <Input.Password
        value={value}
        autoComplete="current-password"
        id="password"
        size="large"
        placeholder="password..."
        iconRender={(visible) =>
          visible ? (
            <PiEyeThin size={20} className="cursor-pointer" />
          ) : (
            <PiEyeSlashThin size={20} className="cursor-pointer" />
          )
        }
        onChange={onChangePassword}
      />
    </div>
  );
}
