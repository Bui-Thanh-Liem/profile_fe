import { Col, Row, Space } from "antd";

export default function StorageLayout({
  children,
  requireLogin,
  notificationForCustomer,
}: {
  children: React.ReactNode;
  notificationForCustomer: React.ReactNode;
  requireLogin: React.ReactNode;
}) {
  return (
    <>
      {requireLogin}
      {notificationForCustomer}
      {children}
      <Space>
        <Row>
          <Col>Intro</Col>
        </Row>
        <Row>
          <Col>Front-end</Col>
        </Row>
        <Row>
          <Col>Back-end</Col>
        </Row>
        <Row>
          <Col>Devops</Col>
        </Row>
        <Row>
          <Col>Base Algorithm</Col>
        </Row>
        <Row>
          <Col>Advanced Algorithm</Col>
        </Row>
        <Row>
          <Col>Command line</Col>
        </Row>
      </Space>
    </>
  );
}
