import { updateMe } from "@/apis/customer.api";
import ButtonPrimary from "@/components/elements/ButtonPrimary";
import useCustomerStore from "@/stores/useCustomerStore";
import { convertToMDY } from "@/utils/convertMDY";
import { showMessage, showMessageByString } from "@/utils/show-message.util";
import {
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
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
  DatePicker,
  Descriptions,
  Form,
  Input,
  Row,
  Space,
  Switch,
  Tabs,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

function ProfileDetail() {
  const router = useRouter();
  const { currentCustomer, loginCustomer } = useCustomerStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      ...currentCustomer,
      birthday: currentCustomer?.birthday
        ? dayjs(currentCustomer.birthday, "MM-DD-YYYY") // 👈 convert lại từ string
        : null,
    });
  };

  const handleSave = async () => {
    if (!currentCustomer?.id) return;

    try {
      const values = await form.validateFields();
      console.log("values :::", values);

      // 👇 Convert birthday to MM/DD/YYYY
      if (values.birthday) {
        values.birthday = values.birthday.format("MM-DD-YYYY");
      }
      console.log("values :::", values);

      const res = await updateMe(currentCustomer?.id, values);
      showMessage(res);
      if (res.statusCode !== 200) return;
      setIsEditing(false);
      loginCustomer(res.data);
    } catch (error) {
      console.log(error);
      showMessageByString("Error, please login again!", "error");
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

              <Space>
                {currentCustomer?.active ? (
                  <Tag color="green">active</Tag>
                ) : (
                  <>
                    <Tag color="red">no-active</Tag>
                    <span className="text-gray-400">
                      Incomplete information
                    </span>
                  </>
                )}
              </Space>
            </Space>
          </Col>
          <Col>
            <Space>
              {!isEditing ? (
                <ButtonPrimary icon={<EditOutlined />} onClick={handleEdit}>
                  Edit
                </ButtonPrimary>
              ) : (
                <Space>
                  <ButtonPrimary icon={<SaveOutlined />} onClick={handleSave}>
                    Save
                  </ButtonPrimary>
                  <Button icon={<CloseOutlined />} onClick={handleCancel}>
                    Cancel
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
                <span>Personal information</span>
              </span>
            }
            key="1"
          >
            {isEditing ? (
              <Form form={form} layout="vertical">
                <Row gutter={24}>
                  <Col span={16}>
                    <Form.Item
                      label="fullName"
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your fullName!",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        prefix={<UserOutlined />}
                        placeholder="Enter your fullName"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Birthday" name="birthday">
                      <DatePicker
                        size="large"
                        format="MM-DD-YYYY"
                        placeholder="Select birthday"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Descriptions bordered column={1}>
                <Descriptions.Item label="fullName" span={1}>
                  <UserOutlined style={{ marginRight: 8 }} />
                  {currentCustomer?.fullName}
                </Descriptions.Item>

                <Descriptions.Item label="Birthday" span={1}>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  {currentCustomer?.birthday || "##-##-####"}
                </Descriptions.Item>

                <Descriptions.Item label="Account creation date" span={1}>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  {convertToMDY(
                    currentCustomer?.createdAt as unknown as string
                  )}
                </Descriptions.Item>
              </Descriptions>
            )}
          </TabPane>

          {/* Tab Thông tin liên hệ */}
          <TabPane
            tab={
              <span>
                <MailOutlined className="mr-1" />
                <span>Contact information</span>
              </span>
            }
            key="2"
          >
            {isEditing ? (
              <Form form={form} layout="vertical">
                <Row gutter={24}>
                  <Col span={16}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please input your email!" },
                        {
                          type: "email",
                          message: "The input is note a valid email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        size="large"
                        placeholder="Enter your email"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Phone" name="phone">
                      <Input
                        prefix={<PhoneOutlined />}
                        placeholder="Enter your phone"
                        size="large"
                      />
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
                <Descriptions.Item label="Phone">
                  <PhoneOutlined style={{ marginRight: 8 }} />
                  {currentCustomer?.phone || "##########"}
                </Descriptions.Item>
              </Descriptions>
            )}
          </TabPane>

          {/* Tab Bảo mật */}
          <TabPane
            tab={
              <span>
                <SafetyOutlined className="mr-1" />
                <span>Security</span>
              </span>
            }
            key="3"
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card size="small" title="Change password">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text>Update your password to protect your account</Text>
                  </Col>
                  <Col>
                    <Button type="primary">Change</Button>
                  </Col>
                </Row>
              </Card>

              <Card size="small" title="Login session">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text>Manage login sessions on other devices</Text>
                  </Col>
                  <Col>
                    <Button>See details</Button>
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
                <span>Setting</span>
              </span>
            }
            key="4"
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card size="small" title="Notification">
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginBottom: 16 }}
                >
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>Email notifications</Text>
                      <Text type="secondary">Get notified by email</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Switch defaultChecked={true} />
                  </Col>
                </Row>

                <Row justify="space-between" align="middle">
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>Phone number notification</Text>
                      <Text type="secondary">
                        Get notifications on your phone
                      </Text>
                    </Space>
                  </Col>
                  <Col>
                    <Switch defaultChecked={false} />
                  </Col>
                </Row>
              </Card>

              <Card size="small" title="Interface">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>Dark mode</Text>
                      <Text type="secondary">Use dark theme</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Switch defaultChecked={false} />
                  </Col>
                </Row>
              </Card>

              <Card size="small" title="Language">
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space direction="vertical" size={0}>
                      <Text strong>LanguageDisplay language</Text>
                      <Text type="secondary">Vietnamese</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Button>Change</Button>
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

export default memo(ProfileDetail);
