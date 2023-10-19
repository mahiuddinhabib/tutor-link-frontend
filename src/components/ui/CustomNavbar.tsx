import React, { useState } from "react";
import { Layout, Button, Drawer, Menu, Avatar } from "antd";
// import LeftMenu from "./LeftMenu";
// import RightMenu from "./RightMenu";
import {
  MenuOutlined,
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
// import { useLocation } from "react-router-dom";

const CustomNavbar = () => {
    const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header
          className="nav-header"
          style={{
            background: "#fff",
            // background: "yellow",
          }}
        >
          <div className="logo">
            <h3 className="brand-font">Brand Here</h3>
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              {/* <LeftMenu mode={"horizontal"} /> */}
              <Menu
                mode="horizontal"
                items={[
                  {
                    label: <Link href={"/profile"}>Dashboard</Link>,
                    key: "dashboard",
                  },
                  {
                    label: <Link href={"/profile"}>Bookings</Link>,
                    key: "booking",
                  },
                  {
                    label: <Link href={"/profile"}>History</Link>,
                    key: "history",
                  },
                  {
                    label: <Link href={"/profile"}>History</Link>,
                    key: "history",
                  },
                ]}
              >
                {/* <Menu.Item key="explore">Explore</Menu.Item>
                <Menu.Item key="features">Features</Menu.Item>
                <Menu.Item key="about">About Us</Menu.Item>
                <Menu.Item key="contact">Contact Us</Menu.Item> */}
              </Menu>
            </div>
            <div className="rightMenu">
              <Menu
                mode="horizontal"
                items={[
                  {
                    label: <Avatar icon={<UserOutlined />} />,
                    key: "avatar",
                    children: [
                      {
                        label: (
                          <>
                            <LogoutOutlined /> Logout
                          </>
                        ),
                        key: "logout",
                      },
                    ],
                  },
                ]}
              >

              </Menu>
            </div>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default CustomNavbar;
