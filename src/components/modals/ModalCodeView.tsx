"use client";

import { showToastByString } from "@/utils/show-toast.util";
import { CopyOutlined } from "@ant-design/icons";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { Button, Modal, Tooltip } from "antd";
import { ReactNode, useState } from "react";

export function ModalCodeView({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      showToastByString("Copied !", "success");
    });
  };

  //
  if (!value) return <span>-</span>;

  //
  return (
    <>
      <span onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        {children}
      </span>

      <Modal
        title="Code views"
        closable={true}
        open={isModalOpen}
        centered
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={true}
        width={900}
      >
        <div className="relative">
          <Tooltip
            title="Copy to clipboard"
            placement="right"
            className="absolute right-4 -bottom-14 z-50"
          >
            <Button
              icon={<CopyOutlined />}
              onClick={handleCopy}
              style={{ marginBottom: 10 }}
            />
          </Tooltip>
        </div>
        <CodeMirror
          readOnly
          onCopy={() => {}}
          value={value}
          theme={"dark"}
          extensions={[javascript()]}
          maxHeight="80vh"
          minHeight="100px"
        />
      </Modal>
    </>
  );
}
