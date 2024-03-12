import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../providers/Socket";

const HomePage = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();

  const handleRoomJoined = useCallback(
    ({ roomId }) => {
      //console.log("Room Joined", roomId);
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );
  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
    return () => {
      socket.off("joined-room", handleJoinRoom);
    };
  }, [handleRoomJoined, socket]);

  const handleJoinRoom = () => {
    socket.emit("join-room", { emailId: email, roomId });
  };

  return (
    <div className="container mt-5" style={{ height: "100vh" }}>
      <div className="row">
        <h4 className="text-center">Video Calling Application</h4>
        <div className="col-6 m-auto">
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="form-control mb-2"
            type="text"
            placeholder="Enter Room Code"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />
          <button
            onClick={handleJoinRoom}
            className="btn btn-primary text-center"
          >
            Enter Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
