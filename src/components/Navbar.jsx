import React, { useState } from 'react';
import Modal from './Modal.jsx';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false); // Add state for modal visibility

  return (
    <div>
      <header className="header flex justify-between align-middle px-10 py-3 border-b-[1px] border-gray-200">
        <a
          href="#"
          className="font-bold text-lg text-gray-700 sm:text-xl lg:text-2xl" // Adjust font size for mobile
        >
          Project-Validator
        </a>

        <nav className="navbar font-bold">
          <div className="text-center">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
              onClick={() => setShowModal(true)} // Open modal
            >
              Upload
            </button>
          </div>
        </nav>
      </header>

      {/* Modal component */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl sm:text-lg xs:text-base font-semibold text-gray-900 mb-5">
            Modal Title
          </h3>
          <p className="sm:text-sm xs:text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ipsum corrupti ad
            perspiciatis officiis aliquid fugit veniam facere eaque voluptate, natus voluptatum,
            consequuntur eius. Eligendi consectetur ab dolorum cum architecto.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
