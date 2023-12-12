import type { MenuProps } from "antd";
import {
  UsergroupAddOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  HistoryOutlined,
  FieldTimeOutlined,
  HourglassOutlined,
  TeamOutlined,
  SolutionOutlined,
  BookOutlined,
  DiffOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <SolutionOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];


  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,
    {
      label: "Manage Users",
      key: "manage-users",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link href={`/${role}/customer`}>Customers</Link>,
          key: `/${role}/customer`,
          // icon: <UserOutlined />,
        },
        {
          label: <Link href={`/${role}/tutor`}>Tutors</Link>,
          key: `/${role}/tutor`,
          // icon: <UserOutlined />,
        },
      ],
    },
    {
      label: "Manage Services",
      key: "manage-service",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service`}>Services</Link>,
          key: `/${role}/service`,
          // icon: <PicCenterOutlined />,
        },
        {
          label: <Link href={`/${role}/service/create`}>Add New Service</Link>,
          key: `/${role}/service/create`,
          // icon: <PlusSquareOutlined />,
        },
        {
          label: (
            <Link href={`/${role}/availableService`}>Available Services</Link>
          ),
          key: `/${role}/availableService`,
          // icon: <ContainerOutlined />,
        },
        {
          label: (
            <Link href={`/${role}/availableService/create`}>
              Create New Available Service
            </Link>
          ),
          key: `/${role}/availableService/create`,
          // icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: "Manage Bookings",
      key: "defaultOpenKey",
      icon: <BookOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking`}>Bookings</Link>,
          key: `defaultSelectedKey`,
          // icon: <InsertRowBelowOutlined />,
        },
        {
          label: <Link href={`/${role}/bookingRequest`}>Booking Requests</Link>,
          key: `/${role}/bookingRequest`,
          // icon: <PullRequestOutlined />,
        },
        {
          label: (
            <Link href={`/${role}/bookingHistory`}>Booking Histories</Link>
          ),
          key: `/${role}/bookingHistory`,
          // icon: <HistoryOutlined />,
        },
      ],
    },
    {
      label: "Manage Contents",
      key: "manage-contents",
      icon: <DiffOutlined />,
      children: [
        {
          label: <Link href={`/${role}/faq`}>FAQs</Link>,
          key: `/${role}/faq`,
          icon: <QuestionCircleOutlined />,
        },
        {
          label: <Link href={`/${role}/blog`}>Blogs</Link>,
          key: `/${role}/blog`,
          icon: <FileTextOutlined />,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,
    {
      label: "Manage Admin",
      icon: <TeamOutlined />,
      key: "defaultOpenKey",
      children: [
        {
          label: <Link href={`/${role}/admin`}>Admins</Link>,
          key: `defaultSelectedKey`,
          // icon: <UserSwitchOutlined />,
        },
        {
          label: <Link href={`/${role}/permission`}>Manage Permission</Link>,
          key: `/${role}/permission`,
          // icon: <UserAddOutlined />,
        },
      ],
    },
  ];

  const customerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Tuitions",
      key: `defaultOpenKey`,
      icon: <BookOutlined />,
      children: [
        {
          label: <Link href={`/${role}/running`}>Running</Link>,
          key: `defaultSelectedKey`,
          // icon: <FieldTimeOutlined />,
        },
        {
          label: <Link href={`/${role}/pending`}>Pending</Link>,
          key: `/${role}/pending`,
          // icon: <HourglassOutlined />,
        },
        {
          label: <Link href={`/${role}/history`}>History</Link>,
          key: `/${role}/history`,
          // icon: <HistoryOutlined />,
        },
      ],
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.CUSTOMER) return customerSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
