"use client";
import styles from "@/styles/main-layout/mainHeader.module.scss";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Image, Space } from "antd";
import React from "react";

export default function MainHeader({ user }) {
  const items = [
    {
      label: <div>Welcome Guest!</div>,
      key: "0",
    },
  ];

  return (
    <>
      <header className={`qc-px-4 ${styles.qcMainHeader}`}>
        <div className={styles.logoContainer}></div>
        <div className={styles.mainHeaderRightCol}>
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Button
                onClick={(e) => e.preventDefault()}
                className={styles.mainHeaderUserInfoGrid}
              >
                <Space className="cursorPointer">
                  <div>
                    <Avatar
                      className="navItem avtarTransparent cursorPointer"
                      shape="square"
                      src={
                        <Image
                          src="/images/user.png"
                          alt="avatar"
                          preview={false}
                        />
                      }
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.userTitle}>
                    <div className={styles.userName}>Guest</div>
                  </div>
                  <div>
                    <DownOutlined />
                  </div>
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}
