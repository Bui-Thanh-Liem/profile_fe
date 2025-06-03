import { deleteMulti } from "@/apis/note";
import { INote } from "@/interfaces/model.interface";
import { convertToMDY } from "@/utils/convertMDY";
import { showMessage } from "@/utils/show-message.util";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Tag } from "antd";
import { memo, useEffect, useState, useTransition } from "react";

interface IPropNoteView {
  note: INote | undefined;
  onclickEdit: () => void;
  onCloseModal: () => void;
}

function areEqual(prevProps: IPropNoteView, nextProps: IPropNoteView) {
  return prevProps.note?.id === nextProps.note?.id;
}

function NoteView({ note, onCloseModal, onclickEdit }: IPropNoteView) {
  const [isOpenView, setIsOpenView] = useState(false);
  const [isPendingDelete, startTransitionDelete] = useTransition();

  useEffect(() => {
    setIsOpenView(Boolean(note?.id));
  }, [note]);

  //
  function handleDelete() {
    startTransitionDelete(async () => {
      try {
        if (note) {
          const res = await deleteMulti([note?.id]);

          //
          showMessage(res);
          if (res.statusCode !== 200) {
            return;
          }
          setIsOpenView(false);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Modal
      open={isOpenView}
      title={
        <Row justify="space-between" align="middle">
          <Col>
            <Tag color={note?.status?.toLocaleLowerCase()}>{note?.status}</Tag>
          </Col>
          <Col className="flex gap-4">
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              loading={isPendingDelete}
            />
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={onclickEdit}
            />
          </Col>
        </Row>
      }
      closeIcon={null}
      footer={null}
      maskClosable
      onCancel={() => {
        setIsOpenView(false);
        onCloseModal();
      }}
    >
      <Row>
        <Col span={2}>
          <div
            className={`w-4 h-4 mt-1`}
            style={{ backgroundColor: note?.color }}
          />
        </Col>
        <Col span={22}>
          <h1 className="line-clamp-2">{note?.title}</h1>
          <p className="text-gray-400 line-clamp-4">{note?.desc}</p>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col></Col>
        <Col>
          <p>{convertToMDY(note?.date as unknown as string)}</p>
        </Col>
      </Row>
    </Modal>
  );
}

export default memo(NoteView, areEqual);
