import axios from "axios";
import React, { useState } from "react";
// import { instance as axios } from "../services/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const Modal = ({ isVisible, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    author_name: "",
    project_title: "",
    date_of_submission: "",
    abstract: "",
    aims: "",
    objectives: [],
    supervisor: "",
  });

  if (!isVisible) return null;

  const areAllPropertiesNotEmpty = (obj) => {
    return Object.values(obj).every(
      (value) => value !== "" && value !== null && value !== undefined
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!areAllPropertiesNotEmpty(formData))
      return toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });

    const { date_of_submission } = formData;
    const formattedDate = new Date(date_of_submission).toISOString();

    const editedFormData = {
      ...formData,
      date_of_submission: formattedDate,
      objectives: formData.objectives.split(","),
    };

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://project-validator.onrender.com/api/v1/create",
        editedFormData
      );

      toast.success(`${data.message || "Success"}`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });

      onClose(); // Close the modal after submission
    } catch (error) {
      toast.error(`${error.message || "Something went wrong"}`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
        id="wrapper"
        onClick={handleClose}
      ></div>
      <div className="absolute flex justify-center items-center w-full">
        <div className="w-[90%] sm:w-[600px] flex-col z-50">
          {!loading ? (
            <>
              <button
                className="text-white text-xl place-self-end"
                onClick={() => onClose()}
              >
                X
              </button>

              <form
                className="bg-white p-4 sm:p-6 rounded space-y-4 overflow-y-auto"
                action=""
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Name of Authors
                  </label>
                  <input
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Enter author names"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Title of Project
                  </label>
                  <input
                    type="text"
                    name="project_title"
                    value={formData.project_title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Date of Submission
                  </label>
                  <input
                    type="date"
                    name="date_of_submission"
                    value={formData.date_of_submission}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Abstract
                  </label>
                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Enter abstract"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Aims
                  </label>
                  <input
                    type="text"
                    name="aims"
                    value={formData.aims}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Enter Project Aim"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Objectives
                  </label>
                  <input
                    type="text"
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Enter Project Objectives. Comma separated"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Supervisor
                  </label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                    placeholder="Supervisor Name"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-300 text-black rounded-md"
                    onClick={() => onClose()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="absolute inset-0 bg-[#0000007a] text-white text-3xl flex items-center justify-center">
              Please wait...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
