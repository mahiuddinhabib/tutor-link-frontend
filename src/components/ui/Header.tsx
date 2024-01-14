import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import commonProfileImg from "@/assets/profile.png";
import Image from "next/image";
const { Header: AntHeader } = Layout;

const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  const { data, isLoading: userLoading } = useGetProfileQuery(undefined);

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <AntHeader
      style={{
        background: "#fff",
        // background: "yellow",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <span />
        <h2>{title}</h2>
        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar
                size="large"
                src={
                  data?.profileImg || (
                    <Image src={commonProfileImg} alt="BrandIcon" />
                  )
                }
              />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
