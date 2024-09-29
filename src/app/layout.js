"use client";
import "@/styles/globals.scss";
import "@/styles/ant-styles.scss";
import "@/styles/styles.scss";
import "@/styles/main-layout/main-layout-style.scss";
import { ConfigProvider } from "antd";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#F96F6A",
          colorSecondary: "#cfe3fa",
          fontFamily: "Poppins, sans-serif",
        },
      }}
    >
      <html lang="en">
        <body>
          <StyledComponentsRegistry>
            <main>{children}</main>{" "}
          </StyledComponentsRegistry>
        </body>
      </html>
    </ConfigProvider>
  );
}
