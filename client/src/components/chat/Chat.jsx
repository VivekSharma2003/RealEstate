import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { format as formatDate, isValid } from "date-fns";
import { useNotificationStore } from "../../lib/notificationStore";
import { FaPaperPlane } from "react-icons/fa";

function Chat({ chats, initialChatId }) {
  const [chat, setChat] = useState(null);
  const [localChats, setLocalChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const decrease = useNotificationStore((s) => s.decrease);
  const messageEndRef = useRef();

  useEffect(() => {
    setLocalChats(chats);
  }, [chats]);

   useEffect(() => {
       if (!initialChatId || !localChats.length) return;
       const c = localChats.find(c => c.id === initialChatId);
       if (c) {
         handleOpenChat(c.id, c.receiver);
       }
     }, [initialChatId, localChats]); 

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) decrease();
      setChat({ ...res.data, receiver });

      setLocalChats(prev =>
        prev.map(c =>
          c.id === id
            ? {
                ...c,
                seenBy: c.seenBy.includes(currentUser.id)
                  ? c.seenBy
                  : [...c.seenBy, currentUser.id],
              }
            : c
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const text = new FormData(e.target).get("text");
    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat(prev => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!chat || !socket) return;
    const markRead = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch {}
    };
    socket.on("getMessage", data => {
      if (data.chatId === chat.id) {
        setChat(prev => ({ ...prev, messages: [...prev.messages, data] }));
        markRead();
      }
    });
    return () => socket.off("getMessage");
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h2>Messages</h2>
        {localChats?.map(c => {
        const lastText = c.lastMessage;
        const lastTime = c.lastMessageCreatedAt ?? c.createdAt;
          const isUnread = !c.seenBy.includes(currentUser.id);
          console.log(lastTime)

          return (
            <div
              key={c.id}
              className={
                "message" +
                (chat?.id === c.id ? " active" : "") +
                (isUnread ? " unread" : "")
              }
              onClick={() => handleOpenChat(c.id, c.receiver)}
            >
              <img
                src={c.receiver.avatar || "/noavatar.jpg"}
                alt={c.receiver.username}
              />
              <div className="message-info">
                <span className="username">{c.receiver.username}</span>
                <p className="lastMessage">{lastText}</p>
              </div>
              <span className="timeago">{format(lastTime)}</span>
            </div>
          );
        })}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || "/noavatar.jpg"}
                alt={chat.receiver.username}
              />
              <span className="username">{chat.receiver.username}</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              ×
            </span>
          </div>

          <div className="center">
            {chat.messages.map(msg => (
              <div
                key={msg.id}
                className={
                  "chatMessage" + (msg.userId === currentUser.id ? " own" : "")
                }
              >
                <p>{msg.text}</p>
                <span className="timestamp">{format(msg.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" placeholder="Type a message…" />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;