import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";
const url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  console.log(url, "ddfdfsds");
  const socket = useMemo(() => io(url), []);

  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);

  console.log("messagesReceived", messagesReceived);

  useEffect(() => {
    socket.on("welcome", () => {
      setSocketId(socket.id);
    });

    socket.on("receive-message", (data) =>
      setMessagesReceived((messages) => [...messages, data])
    );
  }, []);

  return (
    <div>
      <h4>Socket ID: {socketId}</h4>
      <div>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e?.target?.value)}
          type="text"
          placeholder="Enter Room Name"
        />
        <button
          onClick={() => {
            socket.emit("join-room", roomName);
            setRoomName("");
          }}
        >
          Join My Room
        </button>
      </div>
      <input
        value={message}
        placeholder="Type message"
        onChange={(e) => setMessage(e?.target?.value)}
        type="text"
      />
      <input
        value={room}
        placeholder="Enter Room"
        onChange={(e) => setRoom(e?.target?.value)}
        type="text"
      />
      <button
        onClick={() => {
          socket.emit("message", { message, room });
          setMessage("");
        }}
      >
        Send
      </button>

      <div>
        {messagesReceived?.map((item, idx) => (
          <p key={idx}>{item?.message}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
