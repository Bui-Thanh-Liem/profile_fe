"use client";
import { CardPercentAdmin } from "@/components/cards/CardPercentAdmin";
import { Col, Row } from "antd";

export default function Dashboard() {
  return (
    <div>
      <Row>
        <Col xs={24} md={12} lg={5}>
          <CardPercentAdmin title="User" value={34} percent={0.5} />
        </Col>
        <Col xs={24} md={12} lg={5}>
          <CardPercentAdmin title="User" value={34} percent={0.5} />
        </Col>
        <Col xs={24} md={12} lg={5}>
          <CardPercentAdmin title="User" value={34} percent={0.5} />
        </Col>
      </Row>
    </div>
  );
}
