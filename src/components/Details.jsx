import React from 'react';

const Details = () => {
  return (
    <div className="my-5">
      <div className="bg-gray-100 p-6 m-4 rounded-md shadow-md h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Project Details</h2>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-base text-gray-700">John Doe</p>
          </div>
          {/* Topic */}
          <div>
            <p className="text-sm font-medium text-gray-500">Topic</p>
            <p className="text-base text-gray-700">Artificial Intelligence</p>
          </div>
          {/* Date of Submission */}
          <div>
            <p className="text-sm font-medium text-gray-500">Date of Submission</p>
            <p className="text-base text-gray-700">January 15, 2025</p>
          </div>
          {/* Description */}
          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="text-base text-gray-700">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius consectetur praesentium eligendi alias soluta optio fuga dicta vero, tenetur velit sed nam asperiores nemo neque ea? Dolor quis nobis quae animi blanditiis consequuntur odio a perferendis fuga dolorem quo laudantium maxime repellendus voluptatibus nesciunt recusandae debitis, repellat autem nulla! Labore natus delectus odit ex, voluptates magni optio laudantium porro ducimus cum eius. Nulla eum consequuntur ipsam excepturi autem possimus architecto optio, quo mollitia totam, saepe aliquam. Aliquid voluptatum repellat exercitationem excepturi, voluptas porro ea totam numquam a illo consequatur labore id delectus mollitia quidem at suscipit accusamus, laudantium nisi fuga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;