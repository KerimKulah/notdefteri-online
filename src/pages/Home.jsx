import React from 'react'
import Headerr from '../components/Headerr'
import Sidebar from '../components/Sidebar'
import Footerr from '../components/Footerr'
import NotesContainer from '../components/NotesContainer'
import NavBar from '../components/NavBar'


function home() {


    return (
        <body className='bg-gray-50 text-gray-900s transition-all duration-300 min-h-screen flex flex-col'>
            <Headerr />
            <div className="flex flex-grow">
                <Sidebar />
                {/* Main content */}
                <div className="flex-grow">
                    <NavBar />
                    <NotesContainer />
                </div>
            </div>
            <Footerr />
        </body >
    )


}

export default home