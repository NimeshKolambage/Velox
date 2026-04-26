import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSending) return;

    setIsSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 w-full bg-base-200">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 p-2 bg-base-100 rounded-xl shadow-sm border border-base-300">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300
              flex items-center justify-center border border-zinc-600 shadow-md hover:bg-base-200"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-base-100 rounded-full px-4 py-2 shadow-sm border border-base-300">
          <button
            type="button"
            className={`mr-2 transition-colors ${imagePreview ? "text-primary" : "text-base-content/50 hover:text-base-content"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={22} />
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-base px-2 py-1 placeholder-base-content/50"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className={`btn btn-circle ${text.trim() || imagePreview ? 'btn-primary shadow-md' : 'btn-disabled bg-base-300'}`}
          disabled={!text.trim() && !imagePreview || isSending}
        >
          <Send size={20} className={text.trim() || imagePreview ? 'text-primary-content' : 'text-base-content/30'} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;