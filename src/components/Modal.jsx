import React, { useState } from 'react';

const Modal = ({ isVisible, onClose, onSubmit }) => {
  if (!isVisible) return null;

  const [formData, setFormData] = useState({
    authorName: '',
    projectTitle: '',
    submissionDate: '',
    abstract: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Send the form data to the parent component
    onClose(); // Close the modal after submission
  };

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[90%] sm:w-[600px] flex flex-col z-50">
        <button className="text-white text-xl place-self-end" onClick={() => onClose()}>
          X
        </button>
        <form className="bg-white p-4 sm:p-6 rounded space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name of Authors</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter author names"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Title of Project</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Date of Submission</label>
            <input
              type="date"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Abstract</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter abstract"
              rows="4"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
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
      </div>
    </div>
  );
};

export default Modal;
