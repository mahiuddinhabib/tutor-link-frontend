"use client";
import { Layout } from "antd";
import Header from "./Header";
import CustomNavbar from "./CustomNavbar";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <CustomNavbar />

      <div
        style={{
          padding: "10px",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default Contents;
