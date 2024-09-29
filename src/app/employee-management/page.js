"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { deleteAPI, postAPI } from "@/utils/apiRequest";
import { DELETE_USER, USER_LIST } from "@/api/index";
import { displayMessage, interpolate } from "@/utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { useRouter } from "next/navigation";
const { Text } = Typography;

function User() {
  const [checkedStatus, setCheckedStatus] = useState(true);
  const [emplyeeList, setemplyeeList] = useState([]);
  const [searchemplyeeList, setSearchemplyeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [filters, setFilters] = useState({
    UserRole: "",
    sortBy: "createdAt",
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  });

  const onChangeStatus = (e) => {
    setCheckedStatus(e.target.checked);
  };

  const fetchemplyeeList = async () => {
    setLoading(true);
    try {
      let reqData = filters;
      let res = await postAPI(USER_LIST, reqData);
      setLoading(false);
      if (res?.status === 200) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.data?.totalResults,
          },
        });
        setemplyeeList(res?.data?.results);
        setSearchemplyeeList(res?.data?.results);
      } else {
        setemplyeeList([]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching company list:", error);
    }
  };

  useEffect(() => {
    fetchemplyeeList();
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    setFilters((pre) => ({
      ...pre,
      page: tableParams?.pagination?.current,
      limit: tableParams?.pagination?.pageSize,
    }));
  }, [JSON.stringify(tableParams)]);

  const getUserEditData = async (empID) => {
    router.push(`/employee-management/edit/${empID}`);
  };

  const handleDeleteUser = async (empID) => {
    setLoading(true);
    try {
      const res = await deleteAPI(interpolate(DELETE_USER, [empID]));
      setLoading(false);
      if (res?.status == 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        let updatedemplyeeList = emplyeeList.filter((val) => val.id != empID);
        setemplyeeList(updatedemplyeeList);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  const searchItems = (e) => {
    let val = String(e.target.value).toLowerCase();

    let data = searchemplyeeList?.filter(
      (item) =>
        String(item.Department).toLowerCase().includes(val) ||
        String(item.EmployeeCode).toLowerCase().includes(val) ||
        String(item.FirstName).toLowerCase().includes(val) ||
        String(item.LastName).toLowerCase().includes(val) ||
        String(item.UserName).toLowerCase().includes(val) ||
        String(item.UserRole).toLowerCase().includes(val) ||
        String(item.Mobile).toLowerCase().includes(val)
    );
    setemplyeeList(data);
  };

  const handleTableChange = (pagination) => {
    setTableParams((prevState) => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        current: pagination,
      },
    }));
  };

  return (
    <MainLayout>
      <main>
        <div className="main-page-header">
          <Row align="middle" justify="space-between">
            <Col>
              <h1>Employee Management</h1>
            </Col>
            <Col>
              <Space>
                <Input
                  placeholder="Search Employee"
                  onChange={(e) => searchItems(e)}
                  prefix={<SearchOutlined />}
                />
                <Button
                  href={"employee-management/add"}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                >
                  Add Employee
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
        {emplyeeList && emplyeeList?.length ? (
          <>
            <div className="main-content-container">
              <Spin spinning={loading}>
                <Row gutter={[24, 24]}>
                  {emplyeeList.map((user) => (
                    <Col span={8} key={user.id}>
                      <Card
                        className="cardContainer userContainer"
                        title={
                          <div className="userTitleContainer">
                            <div className="cardImg">
                              <Image
                                // src="/images/user.png"
                                src={
                                  user?.ProfilePhoto
                                    ? process.env
                                        .NEXT_PUBLIC_BACKEND_BASE_IMG_URL +
                                      "/" +
                                      user?.ProfilePhoto
                                    : "/images/user.png"
                                }
                                alt={"User Image"}
                                preview={false}
                              />
                            </div>
                            <div className="cardTitle">
                              <Text>
                                {user.FirstName} {user.LastName}
                              </Text>
                              <div className="qc-mt-2">
                                <Tag color="purple">
                                  Department-{user.Department}
                                </Tag>
                              </div>
                            </div>
                          </div>
                        }
                        bordered={true}
                      >
                        <div>
                          <div className="cardDetail">
                            <Row gutter={[10, 10]}>
                              <Col span={10}>
                                <div>
                                  <Text className="gridKey">User Name</Text>
                                </div>
                                <div className="gridValue">{user.UserName}</div>
                              </Col>
                              <Col span={14}>
                                <div>
                                  <Text className="gridKey">Employee Code</Text>
                                </div>
                                <div className="gridValue">
                                  {user.EmployeeCode}
                                </div>
                              </Col>
                              <Col span={10}>
                                <div>
                                  <Text className="gridKey">Mobile No.</Text>
                                </div>
                                <div className="gridValue">{user.Mobile}</div>
                              </Col>
                              <Col span={14}>
                                <div>
                                  <Text className="gridKey">Email ID</Text>
                                </div>
                                <div className="gridValue">{user.Email}</div>
                              </Col>
                            </Row>
                          </div>
                          <div className="description">
                            <Row gutter={[10, 10]}>
                              <Col span={24}>
                                <div>
                                  <Text className="gridKey">Remarks</Text>
                                </div>
                                <div className="gridValue">
                                  {user.Remark ? user.Remark : "N/A"}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <div className="settingDetail">
                          <div>
                            <Checkbox
                              checked={user.Active}
                              onChange={onChangeStatus}
                            >
                              Active
                            </Checkbox>
                          </div>
                          <div>
                            <Space>
                              <Button
                                onClick={() => getUserEditData(user?.id)}
                                icon={<EditOutlined />}
                                size={"small"}
                              />
                              <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => handleDeleteUser(user?.id)}
                              >
                                <Button
                                  type="primary"
                                  icon={<DeleteOutlined />}
                                  size={"small"}
                                  danger
                                />
                              </Popconfirm>
                            </Space>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Spin>
            </div>
            <Pagination
              total={tableParams.pagination.total}
              pageSize={tableParams.pagination.pageSize}
              current={tableParams.pagination.current}
              onChange={handleTableChange}
            />
          </>
        ) : (
          <Empty />
        )}
      </main>
    </MainLayout>
  );
}

export default User;
