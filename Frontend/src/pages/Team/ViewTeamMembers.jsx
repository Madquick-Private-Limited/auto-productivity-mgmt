import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TeamMembersTable from "../../common/Datatable/TeamMembersTable";
import Modal from "../../common/Modal/Modal";
import UserForm from "../../components/UserForm";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ViewTeamMembers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleFormSubmit = (updatedUser) => {
    const updatedUsers = users?.map((user) =>
      user._id === updatedUser._id ? updatedUser : user
    );
    console.log("Updated user data:", updatedUser);
    setUsers(updatedUsers);
    setIsEditing(false);
  };

  const handleViewClick = async (user) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/single-user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const userData = response.data.data;
      console.log("User data:", userData);
      setSelectedUser(userData);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (user) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/delete-user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">View and Edit Team Members</h1>
      {!isEditing ? (
        <TeamMembersTable
          users={users}
          onViewClick={handleViewClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      ) : (
        <UserForm initialData={selectedUser} onSubmit={handleFormSubmit} />
      )}

      {showModal && selectedUser && !loading ? (
        <Modal
          onClose={() => setShowModal(false)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div
            className="relative w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl transition-all transform-gpu duration-300 ease-out overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors duration-200 ease-in-out"
            >
              <span className="material-icons text-2xl">close</span>
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center text-[#2d3748]">
              User Details
            </h2>
            <div className="flex justify-center mb-6">
              <img
                src={selectedUser.photo || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-2xl transition-transform transform hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-br from-[#4c51bf] to-[#4299e1] text-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                  Personal Information
                </h3>
                <p>
                  <strong className="font-medium">Name:</strong>{" "}
                  {selectedUser.name || "N/A"}
                </p>
                <p>
                  <strong className="font-medium">Email:</strong>{" "}
                  {selectedUser.email || "N/A"}
                </p>
                <p>
                  <strong className="font-medium">Phone:</strong>{" "}
                  {selectedUser.phone || "N/A"}
                </p>
                <p>
                  <strong className="font-medium">Status:</strong>{" "}
                  {selectedUser.status || "N/A"}
                </p>
                <p>
                  <strong className="font-medium">Role:</strong>{" "}
                  {selectedUser.role || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      ) : loading ? (
        <div>Loading...</div>
      ) : null}
    </div>
  );
};

export default ViewTeamMembers;
