import { Card, Col, Row } from "antd";
import ChartBar from "./ChartBar";
import ChartColumn from "./ChartColumn";
import ChartLine from "./ChartLine";
import ChartWaterWare from "./ChartWaterWare";

export default function Dashboard() {
  const charts = [
    <ChartColumn />,
    <ChartLine />,
    <ChartBar />,
    <ChartWaterWare />,
  ];

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card>Biểu đồ 1</Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card>Biểu đồ 2</Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card>Biểu đồ 3</Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card>Biểu đồ 4</Card>
        </Col>

        <Col span={24}>
          <Card>Biểu đồ to (chiếm nguyên hàng)</Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>Biểu đồ 5</Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>Biểu đồ 6</Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="flex gap-8 items-center h-64">
      <ChartColumn />
      <ChartLine />
      <ChartBar />
      <ChartWaterWare />
    </div>
  );
}
