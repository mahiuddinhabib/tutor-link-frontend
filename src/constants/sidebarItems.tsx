import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        // {
        //   label: <Link href={`/${role}/change-password`}>Change Password</Link>,
        //   key: `/${role}/change-password`,
        // },
      ],
    },
  ];

  /* 
  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-student`}>Manage Students</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-student`,
    },
    {
      label: <Link href={`/${role}/manage-faculty`}>Manage Faculty</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-faculty`,
    },
  ];
 */

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,
    {
      label: "Manage Users",
      key: "manage-users",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/customer`}>Customers</Link>,
          key: `/${role}/customer`,
        },
        {
          label: <Link href={`/${role}/tutor`}>Tutors</Link>,
          key: `/${role}/tutor`,
        },
      ],
    },
    {
      label: "Manage Services",
      key: "manage-service",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service`}>Services</Link>,
          key: `/${role}/service`,
        },
        {
          label: <Link href={`/${role}/service/create`}>Add New Service</Link>,
          key: `/${role}/service/create`,
        },
        {
          label: (
            <Link href={`/${role}/availableService`}>Available Services</Link>
          ),
          key: `/${role}/availableService`,
        },
        {
          label: (
            <Link href={`/${role}/availableService/create`}>
              Create New Available Service
            </Link>
          ),
          key: `/${role}/availableService/create`,
        },
      ],
    },
    {
      label: "Manage Bookings",
      key: "manage-bookings",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking`}>Bookings</Link>,
          key: `/${role}/booking`,
        },
        {
          label: <Link href={`/${role}/bookingRequest`}>Booking Requests</Link>,
          key: `/${role}/bookingRequest`,
        },
        {
          label: (
            <Link href={`/${role}/bookingHistory`}>Booking Histories</Link>
          ),
          key: `/${role}/bookingHistory`,
        },
      ],
    },
    {
      label: "Manage Contents",
      key: "manage-contents",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/faq`}>FAQs</Link>,
          key: `/${role}/faq`,
        },
        {
          label: <Link href={`/${role}/blog`}>Blogs</Link>,
          key: `/${role}/blog`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,
    {
      label: "Manage Admin",
      icon: <TableOutlined />,
      key: "manage-admin",
      children: [
        {
          label: <Link href={`/${role}/admin`}>Admins</Link>,
          icon: <TableOutlined />,
          key: `/${role}/admin`,
        },
        {
          label: <Link href={`/${role}/permission`}>Manage Permission</Link>,
          icon: <TableOutlined />,
          key: `/${role}/permission`,
        },
      ],
    },
  ];

  const customerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Tuitions",
      icon: <TableOutlined />,
      key: `tuitions`,
      children: [
        {
          label: <Link href={`/${role}/running`}>Running</Link>,
          icon: <TableOutlined />,
          key: `/${role}/running`,
        },
        {
          label: <Link href={`/${role}/pending`}>Pending</Link>,
          icon: <TableOutlined />,
          key: `/${role}/pending`,
        },
        {
          label: <Link href={`/${role}/history`}>History</Link>,
          icon: <TableOutlined />,
          key: `/${role}/history`,
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
