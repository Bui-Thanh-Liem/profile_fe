"use client";
import { CardPercentAdmin } from "@/components/cards/CardPercentAdmin";
import { Card, Col, Row } from "antd";
import ChartMix from "./ChartMix";

export default function Dashboard() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={5}>
          <CardPercentAdmin title="User" value={24} percent={0.3} />
        </Col>
        <Col xs={24} md={12} lg={5}>
          <CardPercentAdmin title="User" value={54} percent={0.5} />
        </Col>
        <Col xs={24} md={12} lg={5}>
          <CardPercentAdmin title="User" value={94} percent={0.8} />
        </Col>
        <Col xs={24} md={12} lg={9}>
          <Card>
            <ChartMix />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
