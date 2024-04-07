import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../contex/SocketProvider';

const Host = () => {
  const navigate = useNavigate()
  const socket = useSocket();

  const [user, setUser] = useState({

    emailId: "",
    roomId: "",

  });

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

    <div className='w-full flex flex-col items-center text-center justify-center h-[80vh] gap-2'>

      <h1 className='text-xl font-bold'>  Enter The Room </h1>

      <input type="text"
        name="emailId"
        id=""
        placeholder='enter your email here'
        value={user.emailId}
        onChange={handleChange}
        className='p-3 border-2 border-black rounded-xl w-[30%] text-center '
      />

      <input type="text"
        name="roomId" id=""
        placeholder='enter room code'
        value={user.roomId}
        onChange={handleChange}
        className='p-3 border-2 border-black rounded-xl w-[30%] text-center'
      />

      <button
        className='bg-blue-600 w-[30%] p-3 rounded-xl text-white'
        onClick={handleSubmitForm} > Enter room </button>

    </div>
  )
}

export default Host;

