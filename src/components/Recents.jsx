import React from 'react';

const Recents = () => {
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header Section */}
            <div className="bg-[#edf2fa] mx-4 border-2 rounded-md overflow-y-auto border-[#d6e0f1]">
                <div className="py-2 grid grid-cols-4 text-sm sm:text-base">
                    <div className="px-4 flex items-center text-[#8f959c]">Name</div>
                    <div className="px-4 flex items-center border-l-2 border-[#d6e0f1] text-[#8f959c]">Topic</div>
                    <div className="px-4 flex items-center border-l-2 border-[#d6e0f1] text-[#8f959c]">Date of Submission</div>
                    <div className="px-4 flex items-center border-l-2 border-[#d6e0f1] text-[#8f959c]">Supervisor</div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-4 pb-5">
                <div 
                    className="space-y-2 sm:space-y-4 overflow-y-auto" 
                    style={{ maxHeight: '20rem' }} /* Adjust the height limit as needed */
                >
                    {/* Row 1 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 2 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 3 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 4 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 5 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 6 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 7 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 8 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 9 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>

                    {/* Row 10 */}
                    <div className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c]">
                        <div className="px-4 flex items-center">Name</div>
                        <div className="px-4 flex items-center">Topic</div>
                        <div className="px-4 flex items-center">Date</div>
                        <div className="px-4 flex items-center">Supervisor</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recents;
