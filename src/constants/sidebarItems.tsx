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
            <Link href={`/${role}/bookingHistories`}>Booking Histories</Link>
          ),
          key: `/${role}/bookingHistories`,
        },
      ],
    },
    {
      label: "Manage Contents",
      key: "manage-contents",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/faq`}>Bookings</Link>,
          key: `/${role}/faq`,
        },
        {
          label: <Link href={`/${role}/blog`}>Booking Requests</Link>,
          key: `/${role}/blog`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
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
    {
      label: <Link href={`/${role}/courses/schedule`}>Course schedules</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/courses/schedule`,
    },
    {
      label: <Link href={`/${role}/registration`}>Registration</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${role}/registration`,
    },
    {
      label: <Link href={`/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
    {
      label: <Link href={`/${role}/academic-report`}>Academic report</Link>,
      icon: <FileTextOutlined />,
      key: `/${role}/academic-report`,
    },
  ];

  /* 
  const facultySidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
  ];
*/

  const studentSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
    {
      label: <Link href={`/${role}/courses/schedule`}>Course schedules</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/courses/schedule`,
    },
    {
      label: <Link href={`/${role}/registration`}>Registration</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${role}/registration`,
    },
    {
      label: <Link href={`/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
    {
      label: <Link href={`/${role}/academic-report`}>Academic report</Link>,
      icon: <FileTextOutlined />,
      key: `/${role}/academic-report`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.CUSTOMER) return customerSidebarItems;
  // else if (role === USER_ROLE.FACULTY) return facultySidebarItems;
  else if (role === USER_ROLE.STUDENT) return studentSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
