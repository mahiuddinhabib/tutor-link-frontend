import { Avatar, Button, Drawer, Dropdown, Menu, MenuProps, theme } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";

const { useToken } = theme;

const item: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "dashboard",
  },
  {
    label: "Blogs",
    key: "blogs",
  },
  {
    label: "Something",
    key: "something",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
];

const Navbar = () => {
  const { token } = useToken();
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const userLoggedIn = isLoggedIn();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <>
          {userLoggedIn ? (
            <Button onClick={logOut} type="text" danger>
              <LogoutOutlined /> Logout
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")} type="text">
              <LoginOutlined /> Login
            </Button>
          )}
        </>
      ),
    },
  ];
  return (
    <div style={{ height: 65, backgroundColor: token.colorBgBase }}>
      <div
        className="mobileMenuIcon"
        style={{
          height: 56,
        }}
      >
        <MenuOutlined
          style={{ color: token.colorPrimaryActive, fontSize: 25, marginLeft: 15 }}
          onClick={() => setOpenMenu(true)}
        />
        <h3 style={{ display: "inline-block", fontSize: 30 }}>Tutor Link</h3>
        <Dropdown menu={{ items }}>
          <Avatar
            style={{ marginRight: 15 }}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
      <div className="desktopMenu">
        <h2 style={{ display: "inline-block", marginLeft: 15 }}>Tutor Link</h2>
        <Menu
          mode="horizontal"
          items={item}
          style={{
            fontSize: 18,
            paddingTop: 10,
            paddingBottom: 10,
            minWidth: "75%",
            borderBottom: "none",
            backgroundColor: "inherit",
          }}
        />
        <Dropdown menu={{ items }}>
          <Avatar
            style={{ marginRight: 15 }}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
      <Drawer
        open={openMenu}
        placement="left"
        width={"70%"}
        closable={false}
        onClose={() => setOpenMenu(false)}
      >
        <h2 style={{ textAlign: "center", marginBottom: 10 }}>Tutor Link</h2>
        <Menu
          mode="inline"
          items={item}
          style={{ fontSize: 18, border: "none" }}
        />
      </Drawer>
    </div>
  );
};

export default Navbar;
