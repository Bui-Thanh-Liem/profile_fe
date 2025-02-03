"use client";
import { Card, Col, Row } from "antd";
import ChartBar from "./ChartBar";
import ChartColumn from "./ChartColumn";
import ChartLine from "./ChartLine";
import ChartMix from "./ChartMix";
import ChartWaterWare from "./ChartWaterWare";
import ChartRadar from "./ChartRadar";

export default function Dashboard() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={9}>
          <Card>
            <ChartLine />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={9}>
          <Card>
            <ChartBar />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card>
            <ChartWaterWare />
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <ChartMix />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <ChartRadar />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <ChartColumn />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
