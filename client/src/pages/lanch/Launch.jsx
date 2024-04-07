import React from 'react'
import { useNavigate } from 'react-router-dom'

const Launch = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-[100vh] flex flex-col items-center  justify-center '>

            <div className="flex flex-col items-center text-center gap-4">
                <h1 className='text-2xl font-semibold'>
                    Your meeting has been launched
                    <br />
                    Don’t see your Zoom meeting?

                </h1>
                <p className='text-xl p-2'>
                    By joining a meeting, you agree to our Terms of Service and Privacy Statement
                </p>

                <button
                    className='bg-blue-600 text-white p-3 rounded-xl'
                    onClick={() => { navigate('/host') }}>
                    Launch Meeting
                </button>
            </div>
        </div>
    )
}

export default Launch
