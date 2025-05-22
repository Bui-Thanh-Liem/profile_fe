"use client";
import { Card, Col, Row } from "antd";
import ChartMix from "./ChartMix";
import ChartWaterWare from "./ChartWaterWare";

export default function Dashboard() {
  return (
    <div style={{ maxHeight: "calc(100vh - 170px)" }}>
      <Row>
        <Col
          span={24}
          className="h-52 rounded-xl"
          style={{ background: "linear-gradient(135deg, #6253e1, #04befe)" }}
        ></Col>
      </Row>

      {/*  */}
      <Row className="my-6">
        <Col
          span={24}
          className="h-20 rounded-xl"
          style={{ background: "linear-gradient(135deg, #6253e1, #04befe)" }}
        ></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <ChartWaterWare percent={0.4} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <ChartWaterWare percent={0.4} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <ChartWaterWare percent={0.4} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <ChartWaterWare percent={0.4} />
          </Card>
        </Col>
      </Row>

      {/*  */}
      <Row className="my-6">
        <Col
          span={24}
          className="h-20 rounded-xl"
          style={{ background: "linear-gradient(135deg, #6253e1, #04befe)" }}
        ></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <ChartMix />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <ChartMix />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <ChartMix />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <ChartMix />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
