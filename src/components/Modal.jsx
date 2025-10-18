// src/components/Modal.jsx
import React, { useState } from "react";
import { supabase } from "../services/supabaseClient"; // ✅ Supabase client
import { toast } from "react-toastify";

const Modal = ({ isVisible, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    admin_id: "PJVLD001",
    author_name: "",
    project_title: "",
    date_of_submission: "",
    abstract: "",
    aims: "",
    objectives: "", // keep as string for input; split later
    supervisor: "",
  });

  if (!isVisible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ["author_name", "project_title", "date_of_submission", "abstract", "aims", "objectives", "supervisor"];
    const missing = requiredFields.filter(field => !formData[field]?.trim());
    if (missing.length > 0) {
      return toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    // Parse objectives as array
    const objectivesArray = formData.objectives
      .split(",")
      .map(obj => obj.trim())
      .filter(obj => obj);

    const newProject = {
      admin_id: formData.admin_id.toUpperCase().trim() || "PJVLD001",
      author_name: formData.author_name.trim(),
      project_title: formData.project_title.trim(),
      date_of_submission: formData.date_of_submission, // already in YYYY-MM-DD format from <input type="date" />
      abstract: formData.abstract.trim(),
      aims: formData.aims.trim(),
      objectives: objectivesArray,
      supervisor: formData.supervisor.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('Projects')
        .insert([newProject])
        .select();

      if (error) throw error;

      const inserted = data[0];
      toast.success("Project submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      toast.info(
        `Your Admin ID is ${inserted.admin_id}. Keep this safe — you’ll need it to delete or update your project.`,
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          draggable: false,
          closeOnClick: false,
        }
      );

      onClose();
      if (onSubmit) onSubmit(inserted); // optional callback
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit project", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setFormData({
      admin_id: "PJVLD001",
      author_name: "",
      project_title: "",
      date_of_submission: "",
      abstract: "",
      aims: "",
      objectives: "",
      supervisor: "",
    });
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      handleCloseModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[90%] sm:w-[700px] bg-white p-6 rounded-md shadow-md max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="absolute inset-0 bg-[#0000007a] text-white text-3xl flex items-center justify-center">
            Please wait...
          </div>
        ) : (
          <>
            <button
              className="text-gray-600 text-xl place-self-end mb-4"
              onClick={handleCloseModal}
            >
              X
            </button>

            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Abstract
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                  placeholder="Enter abstract"
                  rows="3"
                  required
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
                  required
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
                  placeholder="Enter objectives, comma separated"
                  required
                />
              </div>

              <div className="col-span-2 flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                  onClick={handleCloseModal}
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
        )}
      </div>
    </div>
  );
};

export default Modal;