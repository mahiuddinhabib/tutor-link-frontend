import { Avatar, Button, Drawer, Dropdown, Menu, MenuProps, theme } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import BrandIcon from "@/assets/icon.png";
import Image from "next/image";
import { useGetSubjectsQuery } from "@/redux/api/subjectApi";
import Link from "next/link";
import { USER_ROLE } from "@/constants/role";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import commonProfileImg from "@/assets/profile.png";

const { useToken } = theme;

const Navbar = () => {
  const { data, isLoading: userLoading } = useGetProfileQuery(undefined);
  const { data: subjects, isLoading } = useGetSubjectsQuery(undefined);
  const { role } = getUserInfo() as any;

  let dashboardLabel;
  if (role === USER_ROLE.ADMIN) dashboardLabel = `/${role}/booking`;
  else if (role === USER_ROLE.CUSTOMER) dashboardLabel = `/${role}/running`;
  else if (role === USER_ROLE.SUPER_ADMIN) dashboardLabel = `/${role}/admin`;
  else dashboardLabel = `/login`;

  const item: MenuProps["items"] = [
    {
      label: <Link href={`${dashboardLabel}`}>Dashboard</Link>,
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
    {
      key: "1",
      label: (
        <Button
          onClick={() => router.push(`${userLoggedIn ? `/${role}` : "/login"}`)}
          type="text"
        >
          <UserOutlined />
          Profile
        </Button>
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
            marginLeft: 30,
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
            style={{ marginRight: 30, border: "1px solid #d9d9d9" }}
            size="large"
            src={
              data?.profileImg || (
                <Image src={commonProfileImg} alt="BrandIcon" />
              )
            }
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
                marginLeft: 30,
              }}
            >
              <Image src={BrandIcon} alt="BrandIcon" height={35} />
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
              marginLeft: "35px",
              borderBottom: "none",
              backgroundColor: "inherit",
            }}
          />
        </div>
        <Dropdown menu={{ items }}>
          <Avatar
            style={{
              marginRight: 30,
              border: "1px solid #d9d9d9",
            }}
            size="large"
            src={
              data?.profileImg || (
                <Image src={commonProfileImg} alt="BrandIcon" />
              )
            }
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
