import { useState } from "react";
import Searchbar from "./Searchbar";
import Recents from "./Recents";
import Details from "./Details";

const Division = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Main Content */}
      <div className="flex-grow sm:w-[70%]  border-b sm:border-b-0 border-gray-200">
        <Searchbar onSelect={setSelectedProject} />
        <Recents onSelect={setSelectedProject} />
      </div>

      {/* Details Section */}
      <div className="flex-grow sm:w-[30%] border-l border-gray-200">
        <Details
          selectedProject={selectedProject}
          onUpdate={setSelectedProject}
        />
      </div>
    </div>
  );
};

export default Division;
