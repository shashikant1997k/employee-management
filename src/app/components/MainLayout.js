"use client";
import React, { useState } from "react";
import MainHeader from "./MainHeader";
import { Spin, Tree } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
const { DirectoryTree } = Tree;

export default function MainLayout(props) {
  let { children } = props;
  const [dataLoading, setDataLoading] = useState(false);

  const treeDataMainMenu = [
    {
      title: (
        <Link className="menu-link" href="/employee-management">
          Employee
        </Link>
      ),
      key: "QR Master",
    },
  ];

  return (
    <main className="main-layout">
      <MainHeader />
      <section className="main-wrapper">
        {/* <aside className="main-side-bar">
          <div className="tree-nav">
            <DirectoryTree
              switcherIcon={<DownOutlined />}
              showIcon={false}
              treeData={treeDataMainMenu}
            />
          </div>
        </aside> */}
        <section className="main-content-wrapper">{children}</section>
      </section>
    </main>
  );
}
