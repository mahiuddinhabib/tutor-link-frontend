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
import BrandIcon from "@/assets/icon.png";
import Image from "next/image";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import Link from "next/link";

const { useToken } = theme;

const Navbar = () => {
  const { data: subjects, isLoading } = useGetSubjectsQuery(undefined);
  const item: MenuProps["items"] = [
    {
      label: <Link href={`/profile`}>Dashboard</Link>,
      key: "dashboard",
    },
    {
      label: "Tuitions",
      key: "tuitions",
      children: subjects?.map((subject: any) => {
        return {
          label: <Link href={`/subject/${subject?.id}`}>{subject?.title}</Link>,
          key: subject?.id,
        };
      }),
    },
    {
      label: "Blogs",
      key: "blogs",
    },
  ];
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
          style={{
            color: "gray",
            fontSize: 25,
            marginLeft: 15,
          }}
          onClick={() => setOpenMenu(true)}
        />
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={BrandIcon} alt="BrandIcon" height={27} />
            <h2
              style={{
                display: "inline-block",
                marginLeft: 7,
                // fontSize: "1.5rem",
                fontStyle: "italic",
                color: token.colorPrimary,
                fontFamily: "Lora",
              }}
            >
              Tutor Link
            </h2>
          </div>
        </Link>
        <Dropdown menu={{ items }}>
          <Avatar
            style={{ marginRight: 15 }}
            size="large"
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
      <div className="desktopMenu">
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <Image
                src={BrandIcon}
                alt="BrandIcon"
                height={35}
              />
              <h1
                style={{
                  display: "inline-block",
                  marginLeft: 7,
                  // fontSize: "3rem",
                  fontWeight: "bolder",
                  fontStyle: "italic",
                  color: token.colorPrimary,
                  fontFamily: "Lora",
                }}
              >
                Tutor Link
              </h1>
            </div>
          </Link>
          <Menu
            mode="horizontal"
            items={item}
            style={{
              fontSize: 18,
              paddingTop: 10,
              paddingBottom: 10,
              minWidth: "400px",
              marginLeft: "10fpx",
              borderBottom: "none",
              backgroundColor: "inherit",
              // justifyItems: "start",
            }}
          />
        </div>
        <Dropdown menu={{ items }}>
          <Avatar
            style={{
              marginRight: 15,
            }}
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
        <h3
          style={{
            textAlign: "center",
            marginBottom: 10,
            textDecoration: "underline",
          }}
        >
          Home Menu
        </h3>
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
