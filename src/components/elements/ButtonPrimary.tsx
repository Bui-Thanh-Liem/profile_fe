"use client";
import { IPropButtonPrimary } from "@/interfaces/propsComponent.interface";
import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
        mix-blend-mode: overlay;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const ButtonPrimary = ({ children, ...restProps }: IPropButtonPrimary) => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space>
        <Button htmlType="submit" type="primary" {...restProps}>
          {children}
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default ButtonPrimary;
