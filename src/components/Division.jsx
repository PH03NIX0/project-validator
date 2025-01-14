import React from 'react';
import Searchbar from './Searchbar';
import Recents from './Recents';
import Stats from './Stats';

const Division = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Main Content */}
            <div className="flex-grow sm:w-[70%]  border-b sm:border-b-0 border-gray-200">
                <Searchbar />
                <Recents />
            </div>

            {/* Stats Section */}
            <div className="flex-grow sm:w-[30%] border-l border-gray-200">
                <Stats />
            </div>
        </div>
    );
};

export default Division;
