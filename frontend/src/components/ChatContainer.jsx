import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-bg-pattern bg-base-200/30">
        {messages.map((message) => {
          const isSentByMe = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`chat ${isSentByMe ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className={`chat-bubble flex flex-col relative pb-6 px-4 pt-2.5 min-w-[90px] max-w-[85%] md:max-w-[75%] shadow-md ${isSentByMe ? 'chat-bubble-primary text-primary-content' : 'bg-base-100 text-base-content border border-base-300/50'}`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[250px] rounded-lg mb-2 object-cover shadow-sm"
                  />
                )}
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap mr-10">{message.text}</p>

                {/* Timestamp inside bubble, positioned at the bottom right */}
                <div className={`absolute bottom-1 right-2 text-[10.5px] opacity-75 flex items-center gap-1 ${isSentByMe ? 'text-primary-content' : 'text-base-content'}`}>
                  <span>{formatMessageTime(message.createdAt)}</span>
                  {/* Mock read receipt for sent messages */}
                  {isSentByMe && <span className="text-[14px] leading-none text-info">✓✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;