import { Layout, Button, Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";

const CustomNavbar = () => {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const logIn = () => {
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
            <h3 className="brand-font" style={{color: "black"}}>
              <Link href={"/"} style={{color: "black"}}>Tutor Link</Link>
            </h3>
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <Menu
                mode="horizontal"
                items={[
                  {
                    label: <Link href={`/profile`}>Profile</Link>,
                    key: "booking",
                  },
                  {
                    label: <Link href={`/`}>History</Link>,
                    key: "history",
                  },
                ]}
              ></Menu>
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
                            {userLoggedIn ? (
                              <Button onClick={logOut} type="text" danger>
                                <LogoutOutlined /> Logout
                              </Button>
                            ) : (
                              <Button onClick={logIn} type="text">
                                <LoginOutlined /> Login
                              </Button>
                            )}
                          </>
                        ),
                        key: "logout",
                      },
                    ],
                  },
                ]}
              ></Menu>
            </div>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default CustomNavbar;
