import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Recents = ({ onSelect }) => {
  const [submissions, setSubmissions] = useState([]);
  const [admin_id, setAdminID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await axios.get(
          "https://project-validator.onrender.com/api/v1/projects"
        );
        setSubmissions(data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load submissions.");
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id, adminID) => {
    if (!adminID)
      return toast.error(`Admin ID is required`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });

    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const { data } = await axios.delete(
        `https://project-validator.onrender.com/api/v1/delete/${id}`,
        { data: { admin_id: adminID } }
      );

      toast.success(`${data.message || "Success"}`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });

      setSubmissions((prev) =>
        prev.filter((submission) => submission.id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);

      toast.error(
        `${error.response.data.message || error.message || "An error occured"}`,
        {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        }
      );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mx-4 py-2">
        <h3 className="text-3xl font-semibold text-gray-700">Recents</h3>
      </div>

      <div className="bg-[#edf2fa] mx-4 border-2 rounded-md border-[#d6e0f1]">
        <div className="py-2 grid grid-cols-5 text-sm sm:text-base">
          <div className="px-4 flex items-center text-[#8f959c]">Name</div>
          <div className="px-4 flex items-center border-l-2 border-[#d6e0f1] text-[#8f959c]">
            Topic
          </div>
          <div className="px-4 flex items-center border-l-2 border-[#d6e0f1] text-[#8f959c]">
            Date
          </div>
          <div className="px-4 flex items-center border-l-2 border-[#d6e0f1] text-[#8f959c]">
            Supervisor
          </div>
          <div className="px-4 flex items-center border-l-2 border-[#d6e0f1] text-[#8f959c]">
            Actions
          </div>
        </div>
      </div>

      <div className="mx-4 pb-5">
        <div
          className="space-y-2 sm:space-y-4 overflow-y-auto max-h-[20rem] md:max-h-[35rem] "
          // style={{ maxHeight: "20rem" }}
        >
          {loading ? (
            <p className="p-4 text-gray-500 text-sm">Loading...</p>
          ) : error ? (
            <p className="p-4 text-red-500 text-sm">{error}</p>
          ) : submissions.length === 0 ? (
            <p className="p-4 text-gray-500 text-sm">
              No recent submissions found.
            </p>
          ) : (
            submissions.map((submission, index) => (
              <div
                key={index}
                className="py-2 sm:py-3 grid grid-cols-5 text-sm sm:text-base text-[#8f959c] border-b border-gray-300 cursor-pointer hover:bg-gray-100"
              >
                <div
                  className="px-4 flex items-center"
                  onClick={() => onSelect(submission)}
                >
                  {submission.author_name}
                </div>
                <div
                  className="px-4 flex items-center"
                  onClick={() => onSelect(submission)}
                >
                  {submission.project_title}
                </div>
                <div className="px-4 flex items-center">
                  {submission.date_of_submission}
                </div>
                <div className="px-4 flex items-center">
                  {submission.supervisor}
                </div>
                <div className="px-4 flex items-center space-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => onSelect(submission)}
                  >
                    View
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => {
                      const enteredAdminID = window.prompt("Enter Admin ID:");
                      if (!enteredAdminID) {
                        toast.error(
                          "Admin ID is required to delete a project",
                          {
                            position: "top-right",
                            autoClose: 3000,
                            closeOnClick: true,
                          }
                        );
                        return;
                      }
                      handleDelete(submission.id, enteredAdminID);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Recents;
