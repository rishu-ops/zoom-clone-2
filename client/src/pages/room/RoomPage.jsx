import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../service/Peer";
import { useSocket } from "../../contex/SocketProvider";
import { useNavigate } from "react-router-dom";

const RoomPage = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [mutedAudio, setMuted] = useState(true);
  const [videoVisible, setVideoVisible] = useState(true);


  const handleEndCall = () => {
    setRemoteStream(null)
    navigate('/dashboard');

  }


  const toggleVideoVisibility = () => {
    setVideoVisible(!videoVisible);
  };

  const handleUserJoined = useCallback(({ emailId, id }) => {
    console.log(`Email ${emailId} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="bg-black w-full h-[88vh] text-white flex flex-col text-center items-center ">

      <h4 className="pt-2 text-3xl">{remoteSocketId ? "Zoom Meeting " : "No one in room"}</h4>
      <div className="flex  gap-6 w-full items-center justify-center h-[500px] lg:p-0 p-5">
        {myStream && (
          <div className="flex flex-col lg:h-[300px] md:h-[200px] h-[150px]">
            <h1>My Stream</h1>
            {videoVisible && (
              <ReactPlayer
                playing
                muted
                height="100%"
                width="100%"
                url={myStream}
              />
            )}
          </div>
        )}
        {remoteStream && (
          <div className="flex flex-col lg:h-[300px] md:h-[200px] h-[150px]">
            <h1>Remote Stream</h1>
            <ReactPlayer
              playing
              muted={mutedAudio} // Set muted attribute based on mutedAudio variable
              height="100%"
              width="100%"
              url={remoteStream}
            />

          </div>
        )}
      </div>

      <div className="flex bg-[#0e0e0e] w-full p-4  items-center justify-center lg:gap-8 gap-3 flex-wrap">

        {myStream && <button
          className="hover:bg-slate-700 rounded-lg p-2 bg-slate-900"
          onClick={sendStreams}>
          Send Stream
        </button>}

        {remoteSocketId && <button
          className="hover:bg-slate-700 rounded-lg p-2 bg-slate-900"
          onClick={handleCallUser}>
          Call
        </button>}

        {remoteSocketId &&
          <button
            className="hover:bg-slate-700 rounded-lg p-2 bg-slate-900"
            onClick={() => setMuted(!mutedAudio)}>
            Muted
          </button>
        }
        
        {remoteSocketId &&

          <button onClick={toggleVideoVisibility}
            className="bg-slate-900 hover:bg-slate-700 rounded-lg p-2 "
          >

            {videoVisible ? 'Hide Video' : 'Show Video'}
          </button>

        }

        {remoteSocketId &&
          <button
            className="hover:bg-slate-700 bg-slate-900 rounded-lg p-2"

            onClick={handleEndCall}> End </button>
        }
      </div>

    </div>
  );
};

export default RoomPage;
