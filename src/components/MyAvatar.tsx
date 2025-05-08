import { IPropMyAvatar } from "@/interfaces/propsComponent.interface";
import { Avatar } from "antd";

export function MyAvatar({ src, alt, fallbackText, ...rest }: IPropMyAvatar) {

  return src ? (
    <Avatar src={src} alt={alt || "user"} className="w-10 h-10" {...rest} />
  ) : (
    <Avatar className="w-10 h-10 bg-blue-500">
      {fallbackText[0]?.toLocaleUpperCase()}
    </Avatar>
  );
}
