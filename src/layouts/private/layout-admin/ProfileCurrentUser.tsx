import ButtonPrimary from "@/components/elements/ButtonPrimary";
import useCustomerStore from "@/stores/useCustomerStore";
import { convertToMDY } from "@/utils/convertMDY";
import {
  BankOutlined,
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
  SaveOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Space,
  Switch,
  Tabs,
  Tag,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export function CustomerProfile() {
  const router = useRouter();
  const { currentCustomer } = useCustomerStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn An",
    email: "nguyenvanan@example.com",
    phone: "+84 123 456 789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    birthday: "15/03/1990",
    position: "Senior Developer",
    department: "Phòng Công nghệ",
    joinDate: "01/01/2020",
    status: "active",
    avatar: "https://via.placeholder.com/120",
  });

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(userInfo);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setUserInfo({ ...userInfo, ...values });
      setIsEditing(false);
      message.success("Cập nhật thông tin thành công!");
    } catch (error) {
      message.error("Vui lòng kiểm tra lại thông tin!");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleLogout = () => {
    router.push("/logout/customer");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Card */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={24} align="middle">
          <Col>
            <Avatar
              size={120}
              src={currentCustomer?.avatar}
              icon={<UserOutlined />}
            />
          </Col>
          <Col flex="auto">
            <Space direction="vertical" size="small">
              <Title level={2} style={{ margin: 0 }}>
                {currentCustomer?.fullName}
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                {userInfo.position}
              </Text>
              <Space>
                <Tag color="blue">{userInfo.department}</Tag>
                <Tag color="green">
                  {userInfo.status === "active"
                    ? "Đang hoạt động"
                    : "Không hoạt động"}
                </Tag>
              </Space>
            </Space>
          </Col>
          <Col>
            <Space>
              {!isEditing ? (
                <ButtonPrimary icon={<EditOutlined />} onClick={handleEdit}>
                  Chỉnh sửa
                </ButtonPrimary>
              ) : (
                <Space>
                  <ButtonPrimary icon={<SaveOutlined />} onClick={handleSave}>
                    Lưu
                  </ButtonPrimary>
                  <Button icon={<CloseOutlined />} onClick={handleCancel}>
                    Hủy
                  </Button>
                </Space>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Tabs */}
      <Card>
        <Tabs defaultActiveKey="1" type="card">
          {/* Tab Thông tin cá nhân */}
          <TabPane
            tab={
              <span>
                <UserOutlined className="mr-1" />
                <span>Thông tin cá nhân</span>
              </span>
            }
            key="1"
          >
            {isEditing ? (
              <Form form={form} layout="vertical">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Họ và tên"
                      name="name"
                      rules={[
                        { required: true, message: "Vui lòng nhập họ tên!" },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Chức vụ"
                      name="position"
                      rules={[
                        { required: true, message: "Vui lòng nhập chức vụ!" },
                      ]}
                    >
                      <Input prefix={<BankOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Ngày sinh" name="birthday">
                      <Input prefix={<CalendarOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Phòng ban" name="department">
                      <Input prefix={<BankOutlined />} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Họ và tên" span={1}>
                  <UserOutlined style={{ marginRight: 8 }} />
                  {currentCustomer?.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Chức vụ" span={1}>
                  <BankOutlined style={{ marginRight: 8 }} />
                  {userInfo.position}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày sinh" span={1}>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  {"##/##/####"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo tài khoản" span={1}>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  {convertToMDY(currentCustomer?.createdAt as any)}
                </Descriptions.Item>
                <Descriptions.Item label="Phòng ban" span={2}>
                  <BankOutlined style={{ marginRight: 8 }} />
                  {userInfo.department}
                </Descriptions.Item>
              </Descriptions>
            )}
          </TabPane>

          {/* Tab Thông tin liên hệ */}
          <TabPane
            tab={
              <span>
                <MailOutlined className="mr-1" />
                <span>Thông tin liên hệ</span>
              </span>
            }
            key="2"
          >
            {isEditing ? (
              <Form form={form} layout="vertical">
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                      ]}
                    >
                      <Input prefix={<MailOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                      ]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Địa chỉ" name="address">
                      <Input.TextArea rows={3} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Email">
                  <MailOutlined style={{ marginRight: 8 }} />
                  {currentCustomer?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  <PhoneOutlined style={{ marginRight: 8 }} />
                  {userInfo.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">
                  <EnvironmentOutlined style={{ marginRight: 8 }} />
                  {userInfo.address}
                </Descriptions.Item>
              </Descriptions>
            )}
          </TabPane>

          {/* Tab Bảo mật */}
          <TabPane
            tab={
              <span>
                <SafetyOutlined className="mr-1" />
                <span>Bảo mật</span>
              </span>
            }
            key="3"
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card size="small" title="Đổi mật khẩu">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text>Cập nhật mật khẩu để bảo vệ tài khoản của bạn</Text>
                  </Col>
                  <Col>
                    <Button type="primary">Đổi mật khẩu</Button>
                  </Col>
                </Row>
              </Card>

              <Card size="small" title="Xác thực 2 bước">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text>Tăng cường bảo mật với xác thực 2 bước</Text>
                  </Col>
                  <Col>
                    <Switch defaultChecked={false} />
                  </Col>
                </Row>
              </Card>

              <Card size="small" title="Phiên đăng nhập">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text>Quản lý các phiên đăng nhập trên thiết bị khác</Text>
                  </Col>
                  <Col>
                    <Button>Xem chi tiết</Button>
                  </Col>
                </Row>
              </Card>
            </Space>
          </TabPane>

          {/* Tab Cài đặt */}
          <TabPane
            tab={
              <span>
                <SettingOutlined className="mr-1" />
                <span>Cài đặt</span>
              </span>
            }
            key="4"
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card size="small" title="Thông báo">
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginBottom: 16 }}
                >
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>Thông báo email</Text>
                      <Text type="secondary">Nhận thông báo qua email</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Switch defaultChecked={true} />
                  </Col>
                </Row>

                <Row justify="space-between" align="middle">
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>Thông báo push</Text>
                      <Text type="secondary">
                        Nhận thông báo trên trình duyệt
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <Switch defaultChecked={false} />
                  </Col>
                </Row>
              </Card>

              <Card size="small" title="Giao diện">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>Chế độ tối</Text>
                      <Text type="secondary">Sử dụng giao diện tối</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Switch defaultChecked={false} />
                  </Col>
                </Row>
              </Card>

              <Card size="small" title="Ngôn ngữ">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>Ngôn ngữ hiển thị</Text>
                      <Text type="secondary">Tiếng Việt</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Button>Thay đổi</Button>
                  </Col>
                </Row>
              </Card>
            </Space>
          </TabPane>
        </Tabs>
      </Card>

      <div className="text-end mt-8">
        <Button
          danger
          type="primary"
          onClick={handleLogout}
          icon={<LogoutOutlined />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
