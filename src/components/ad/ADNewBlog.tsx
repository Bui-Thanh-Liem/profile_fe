import { Alert } from "antd";
import Marquee from "react-fast-marquee";

export default function ADNewBlog() {
  return (
    <Alert
      banner
      message={
        <Marquee pauseOnHover gradient={false}>
          I can be a React component, multiple React components, or just some
          text.
        </Marquee>
      }
    />
  );
}
