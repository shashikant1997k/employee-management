"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
import { LeftOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import Link from "next/link";
import {
  REGEX_ALPHANUMERIC_WITH_SPACE,
  REGEX_ALPHANUMERIC_WITHOUT_SPACE,
  Regex_PositiveIntegerOnly,
} from "@/utils/validation";
import { getAPI, postFileAPI, putFileAPI } from "@/utils/apiRequest";
import { ADD_USER, GET_USER_DATA } from "@/api/index";
import { displayMessage, interpolate } from "@/utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { useRouter } from "next/navigation";

function UserAdd({ params }) {
  const [form] = Form.useForm();
  const router = useRouter();

  const [editUserData, setEditUserData] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    if (params.slug[0] == "edit") {
      fetchUserData(params.slug[1]);
    }
  }, [JSON.stringify(params)]);

  const fetchUserData = async (_id) => {
    setDataLoading(true);
    try {
      let res = await getAPI(interpolate(GET_USER_DATA, [_id]));
      setDataLoading(false);
      if (res?.status == 200) {
        setEditUserData(res?.data);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setDataLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (editUserData) {
      const {
        FirstName,
        LastName,
        Age,
        EmployeeCode,
        Department,
        DateOfJoining,
        Title,
      } = editUserData;
      form.setFieldsValue({
        FirstName: FirstName,
        LastName: LastName,
        Age: Age,
        EmployeeCode: EmployeeCode,
        Department: Department,
        DateOfJoining: DateOfJoining,
        Title: Title,
      });
    }
  }, [editUserData]);

  const onFinish = async (values) => {
    setDataLoading(true);
    try {
      const res = editUserData
        ? await putFileAPI(
            interpolate(GET_USER_DATA, [editUserData?.id]),
            values
          )
        : await postFileAPI(ADD_USER, values);
      setDataLoading(false);
      if (res?.status == 200) {
        editUserData
          ? displayMessage(SUCCESS_MSG_TYPE, res?.message)
          : displayMessage(SUCCESS_MSG_TYPE, res?.message);
        setTimeout(() => {
          router.push("/employee-management");
        }, 1000);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setDataLoading(false);
      displayMessage(
        ERROR_MSG_TYPE,
        "An error occurred while adding the User."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // ==================
  return (
    <MainLayout>
      <main>
        <div className="breadcrumb-container">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link href="/employee-management">
                    <Space>
                      <LeftOutlined />
                      <span>Employee Managment</span>
                    </Space>
                  </Link>
                ),
              },
              {
                title: editUserData ? "Update Employee" : "Add Employee",
              },
            ]}
          />
        </div>
        <section className="main-content-container">
          <Spin spinning={dataLoading}>
            <Form
              form={form}
              name="basic"
              // size="small"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                Active: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div
                style={{
                  maxWidth: 600,
                }}
              >
                <Row gutter={[22, 0]}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="FirstName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter first name!",
                        },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                        {
                          pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                          message: "Special characters are not Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="LastName"
                      rules={[
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                        {
                          pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                          message: "Special characters are not Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Last Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Age"
                      name="Age"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Age!",
                        },
                        {
                          pattern: Regex_PositiveIntegerOnly,
                          message: "Only Number are not Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Age" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Employee Code"
                      name="EmployeeCode"
                      rules={[
                        {
                          required: true,
                          message: "Please enter employee code!",
                        },
                        {
                          pattern: REGEX_ALPHANUMERIC_WITHOUT_SPACE,
                          message:
                            "Space and Special characters are not Allowed!",
                        },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Employee Code" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Department"
                      name="Department"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Department!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="please Select Department"
                        style={{
                          width: "100%",
                        }}
                        options={[
                          {
                            value: "IT",
                            label: "IT",
                          },
                          {
                            value: "Marketing",
                            label: "Marketing",
                          },
                          {
                            value: "HR",
                            label: "HR",
                          },
                          {
                            value: "Engineering",
                            label: "Engineering",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Title"
                      name="Title"
                      rules={[
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                        {
                          pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                          message: "Special characters are not Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Title" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Date Of Joining"
                      name="DateOfJoining"
                      rules={[
                        {
                          message: "Date Of Joining is required!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Date Of Joining" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Divider />
              <Row gutter={[22, 0]}>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="submitBtn"
                    >
                      {editUserData && Object.values(editUserData).length
                        ? "Update"
                        : "Save"}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </section>
      </main>
    </MainLayout>
  );
}

export default UserAdd;
