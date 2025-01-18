import React from 'react';
import { submissions } from '../Submissions';

const Recents = () => {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className='mx-4 py-2'>
                <h3 className='text-3xl font-semibold text-gray-700'>Recents</h3>
            </div>
            {/* Header Section */}
            <div className="bg-[#edf2fa] mx-4 border-2 rounded-md border-[#d6e0f1]">
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
                    <div className="space-y-2 sm:space-y-4 overflow-y-auto" style={{ maxHeight: '20rem' }}>
                        {submissions.map((submission, index) => (
                            <div
                                key={index}
                                className="py-2 sm:py-3 grid grid-cols-4 text-sm sm:text-base text-[#8f959c] border-b border-gray-300"
                            >
                                <div className="px-4 flex items-center">{submission.name}</div>
                                <div className="px-4 flex items-center">{submission.topic}</div>
                                <div className="px-4 flex items-center">{submission.dateOfSubmission}</div>
                                <div className="px-4 flex items-center">{submission.supervisor}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recents;
