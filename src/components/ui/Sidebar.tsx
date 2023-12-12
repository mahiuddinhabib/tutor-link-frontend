"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";

import { sidebarItems } from "@/constants/sidebarItems";
import BrandIcon from "@/assets/iconBlack.png";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;
  // console.log(role);

  console.log(sidebarItems(role));

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme="light"
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Link style={{ textDecoration: "none", color:"black" }} href="/">
        <div
          style={{
            // color: "white",
            // fontSize: "2rem",
            // textAlign: "center",
            // fontWeight: "bold",
            // marginBottom: ".5rem",
            // padding: "10px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "15px 0px",
          }}
        >
          <Image src={BrandIcon} alt="BrandIcon" height={23} />
          <h2
            style={{
              fontSize: "1.5rem",
              marginLeft: 5,
              fontStyle: "italic",
              display: `${!collapsed ? "block" : "none"}`,
            }}
          >
            Tutor Link
          </h2>
        </div>
      </Link>
      <Menu
        defaultSelectedKeys={["defaultSelectedKey"]}
        defaultOpenKeys={["defaultOpenKey"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
