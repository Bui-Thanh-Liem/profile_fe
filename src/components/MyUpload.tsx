import { IPropMyUpload } from "@/interfaces/propsComponent.interface";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const MyUpload = ({ values, onChangeUpload }: IPropMyUpload) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  //
  useEffect(() => {
    if (values && values.length > 0) {
      const files = values.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url,
        thumbUrl: url,
      }));
      setFileList(files as any);
    }
  }, []);

  //
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Chuẩn hóa danh sách file về dạng File[]
    const files = newFileList
      .filter((file) => file.status === "done")
      .map((file) => file.originFileObj as File);

    //
    if (onChangeUpload) {
      onChangeUpload(files);
    }
  };

  //
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </>
  );
};
