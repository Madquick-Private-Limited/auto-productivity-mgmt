import { FaHome, FaUsers, FaUser, FaRegCircle } from "react-icons/fa"; // Import necessary icons
import { RiCustomerService2Fill, RiBuilding2Fill } from "react-icons/ri";
import { MdOutlineAddTask } from "react-icons/md";

const navigation = [
  {
    name: "Dashboard",
    to: "/management/dashboard",
    icon: FaHome,
    current: true,
    roles: ["Admin", "Sale", "Developer", "Designer", "Employee", "Manager"],
  },
  {
    name: "Teams",
    to: "#",
    icon: FaUsers,
    current: false,
    roles: ["Admin"],
    children: [
      {
        name: "Add Members",
        to: "/management/add-team",
        roles: ["Admin"],
        icon: FaRegCircle,
      },
      {
        name: "View Members",
        to: "/management/view-team",
        roles: ["Admin"],
        icon: FaRegCircle,
      },
    ],
  },
  {
    name: "Sales / Calling",
    to: "#",
    icon: RiCustomerService2Fill,
    roles: ["Admin", "Sale"],
    children: [
      {
        name: "Add Client Leads",
        to: "/management/add-sales-leads",
        roles: ["Admin", "Sale"],
        icon: FaRegCircle,
      },
      {
        name: "All Leads",
        to: "/management/all-leads",
        roles: ["Admin", "Sale"],
        icon: FaRegCircle,
      },
    ],
  },
  {
    name: "Projects",
    to: "#",
    icon: RiBuilding2Fill,
    roles: ["Admin"],
    children: [
      {
        name: "Add Project",
        to: "/management/add-projects",
        roles: ["Admin"],
        icon: FaRegCircle,
      },
      {
        name: "All Projects",
        to: "/management/view-projects",
        roles: ["Admin"],
        icon: FaRegCircle,
      },
      {
        name: "Assign Project",
        to: "/management/assign-projects",
        roles: ["Admin"],
        icon: FaRegCircle,
      },
    ],
  },
  {
    name: "Task",
    to: "#",
    icon: MdOutlineAddTask,
    roles: ["Admin"],
    children: [
      {
        name: "Assign Task",
        to: "/management/assign-task",
        roles: ["Employee"],
        icon: FaRegCircle,
      },
      {
        name: "View Task",
        to: "/management/view-tasks",
        roles: ["Admin"],
        icon: FaRegCircle,
      },
    ],
  },
];

export default navigation;
