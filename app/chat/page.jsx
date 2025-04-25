"use client";
import { useEffect, useState } from "react";
import { AiOutlineCopy } from 'react-icons/ai'; 
import { AiOutlineDelete ,AiOutlineCheck } from 'react-icons/ai';
import { FiSmile } from 'react-icons/fi';
const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // إضافة حالة التحميل
  const [copyStatus, setCopyStatus] = useState(null); // حالة نسخ الرسالة

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userMessage.trim() || isLoading) return;

    const newUserMsg = { sender: "user", text: userMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMsg]);
    setIsLoading(true); // بدأ التحميل

    const token = JSON.parse(localStorage.getItem("User"))?.tokens;
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://egyptos.runasp.net/api/ChatMessages/Ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      const botMsg = {
        sender: "bot",
        text: data.botResponse || "لم أتمكن من الرد، حاول مرة أخرى.",
      };

      setMessages((prevMessages) => [...prevMessages, botMsg]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "حدث خطأ، حاول مرة أخرى." },
      ]);
    }

    setUserMessage("");
    setIsLoading(false); // انتهى التحميل
  };

  // دالة نسخ الرد
  const handleCopyMessage = (messageText) => {
    navigator.clipboard.writeText(messageText)
      .then(() => {
        setCopyStatus("success");
        setTimeout(() => setCopyStatus(null), 2000); // اختفاء الحالة بعد ثانيتين
      })
      .catch(() => {
        setCopyStatus("error");
        setTimeout(() => setCopyStatus(null), 2000); // اختفاء الحالة بعد ثانيتين
      });
  };

  return (
    <div className="flex flex-col h-screen w-[95%] md:w-[95%] mx-auto mt-4">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            

            <div className="relative group max-w-[85%] md:max-w-md">
              <div
                className={`p-3 md:p-4  rounded-2xl shadow  ${msg.sender === "user" ? "bg-[#2a4b98] text-white" : "bg-[#dfdede]  text-black "}`}
              >
                {msg.text}
                {/* إضافة أيقونة النسخ */}
                {msg.sender === "bot" && (
                  <button
                    onClick={() => handleCopyMessage(msg.text)}
                    className="absolute bottom-2 right-2 text-gray-600 hover:text-gray-900"
                    title="نسخ الرد"
                  >
                   
                   <AiOutlineCopy className="w-6 h-6 text-[#EEE]  hover:block  " />
                  </button>
                )}

                {/* حالة نسخ الرسالة */}
                { msg.sender === "bot" && copyStatus === "success" && (
                  <div className="absolute top-1 right-1 text-green-500">
                    <AiOutlineCheck className="w-6 h-6 text-green-500" />
                  </div>
                )}
              
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 md:p-4 bg-white border-t flex items-center space-x-2 max-w-full">
      <button
          onClick={() => {
            localStorage.removeItem("chatMessages");
            setMessages([]);
          }}
          className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
          title="مسح المحادثة"
        >
          <AiOutlineDelete className="w-6 h-6 text-red-500 " />
        </button>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="flex-1 p-3 md:p-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="اكتب رسالتك هنا..."
          disabled={isLoading} // تعطيل الـinput أثناء التحميل
        />

        {/* زر المسح */}
       

        <button
          onClick={handleSendMessage}
          disabled={isLoading} // تعطيل الزر أثناء التحميل
          className={`${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} transition text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base`}
        >
          {isLoading ? "جاري الإرسال..." : "إرسال"}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
