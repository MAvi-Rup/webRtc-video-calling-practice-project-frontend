import { useCallback, useEffect } from "react";
import { usePeer } from "../providers/Peer";
import { useSocket } from "../providers/Socket";

const RoomPage = () => {
  const { socket } = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("new", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;

      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer]
  );

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [handleIncomingCall, handleNewUserJoined, socket]);

  return (
    <div className="container">
      <h1>New </h1>
    </div>
  );
};

export default RoomPage;
