import axios from "axios";
import { useEffect, useState } from "react";

const Details = ({ selectedProject, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedProject, setUpdatedProject] = useState(selectedProject);

  useEffect(() => {
    setUpdatedProject(selectedProject);
  }, [selectedProject]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://project-validator.onrender.com/api/v1/update/${updatedProject.id}`,
        updatedProject
      );
      alert("Project updated successfully!");
      setEditMode(false);
      onUpdate(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (!selectedProject) {
    return (
      <div className="my-5">
        <div className="bg-gray-100 p-6 m-4 rounded-md shadow-md h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Project Details
          </h2>
          <p className="text-gray-500">Select a project to see details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-5">
      <div className="bg-gray-100 p-6 m-4 rounded-md shadow-md h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Project Details
        </h2>
        <div className="space-y-4">
          {[
            "author_name",
            "project_title",
            "date_of_submission",
            "description",
          ].map((field) => (
            <div key={field}>
              <p className="text-sm font-medium text-gray-500">
                {field.replace("_", " ")}
              </p>
              {editMode ? (
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={updatedProject[field] || ""}
                  onChange={(e) =>
                    setUpdatedProject({
                      ...updatedProject,
                      [field]: e.target.value,
                    })
                  }
                />
              ) : (
                <p className="text-base text-gray-700">
                  {selectedProject[field]}
                </p>
              )}
            </div>
          ))}

          {/* Aim */}
          <div>
            <p className="text-sm font-medium text-gray-500">Aim</p>
            {editMode ? (
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={updatedProject.aims || ""}
                onChange={(e) =>
                  setUpdatedProject({ ...updatedProject, aims: e.target.value })
                }
              />
            ) : (
              <p className="text-base text-gray-700">{selectedProject.aims}</p>
            )}
          </div>

          {/* Objectives */}
          <div>
            <p className="text-sm font-medium text-gray-500">Objectives</p>
            {editMode ? (
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={updatedProject.objectives.join("\n") || ""}
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    objectives: e.target.value.split("\n"),
                  })
                }
              />
            ) : (
              <div className="text-base text-gray-700 leading-7">
                {selectedProject.objectives?.map((obj, idx) => (
                  <p key={idx}>
                    <span>{idx + 1}.)</span> {obj}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          {editMode ? (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
