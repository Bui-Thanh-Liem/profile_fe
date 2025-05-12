import { IPropMyUpload } from "@/interfaces/propsComponent.interface";
import { setPrefixFile } from "@/utils/setPrefixFile";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Switch, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const MyUpload = ({
  values,
  aspect = 1,
  length = 4,
  onChangeUpload,
}: IPropMyUpload) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isCutImage, setIsCutImage] = useState<boolean>(true);

  //
  useEffect(() => {
    if (values && typeof values[0] === "string" && values.length > 0) {
      const files = values.map((url, index) => ({
        uid: `image-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url: setPrefixFile(url),
        thumbUrl: setPrefixFile(url),
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFileList(files as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChangeUpload(values as any);
    }
  }, [onChangeUpload, values]);

  //
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Chuẩn hóa danh sách file về dạng File[]
    const files = newFileList
      .filter((file) => file.status === "done")
      .map((file) => {
        if (file?.originFileObj) {
          return file.originFileObj;
        } else {
          return file?.url;
        }
      }) as File[];

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
      {isCutImage ? (
        <ImgCrop
          aspect={aspect}
          fillColor="transparent"
          modalTitle="edit image"
          rotationSlider
          zoomSlider
          quality={1}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < length && "+ Upload"}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < length && "+ Upload"}
        </Upload>
      )}
      <div className="mt-2">
        <span className="text-gray-app">Cut image (200x200)</span>
        <Switch
          className="ml-2"
          value={isCutImage}
          onChange={() => setIsCutImage(!isCutImage)}
        />
      </div>
    </>
  );
};
