import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../contex/SocketProvider';

const Join = () => {

  const [user, setUser] = useState({

    emailId: "",
    roomId: "",

  });

  const navigate = useNavigate();
  const socket = useSocket();


  const handleJoinRoom = useCallback((data) => {
    const { emailId, roomId } = data;
    navigate(`/room/${roomId}`)

  }, [navigate])

  const handleSubmitForm = () => {

    const { roomId, emailId } = user;
    socket.emit('room:join', { emailId, roomId });

  }

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  return (
    <div className='w-full h-[50vh] flex items-center justify-center '>

      <div className="flex flex-col items-start gap-4 w-[50%]">

        <h1 className='text-3xl font-semibold'> Join Meeting  </h1>


        <input type="text"
          name="emailId"
          id=""
          placeholder='enter your email here'
          value={user.emailId}
          onChange={handleChange}
          className='w-[100%]  border-2 rounded-lg p-2 '
        />

        <input type="text"
          value={user.roomId}
           name="roomId" id=""
          onChange={handleChange}
          className='w-[100%]  border-2 rounded-lg p-2 '
          placeholder='Meeting ID or Personal Link Name '
        />


        <div className="w-full flex gap-2 justify-end mt-2">


          <button className='p-2 border-2 w-1/4 rounded-lg'
            onClick={() => navigate('/dashboard')}

          > Cancle </button>
          <button className='p-2 border-2 w-1/4 rounded-lg'
               onClick={handleSubmitForm}
          > Join </button>

        </div>
      </div>
    </div>
  )
}

export default Join
