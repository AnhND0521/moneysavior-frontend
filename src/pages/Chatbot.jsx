import React, { useContext, useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiDotsVertical, BiSolidMicrophone, BiSolidSend } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import Message from "../components/Message";
import TransactionMessage from "../components/TransactionMessage";
import environment from "../environments/environment";
import { ClipLoader } from "react-spinners";

const Chatbot = () => {
  const { userUuid } = useContext(LoginContext);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false); // State để theo dõi trạng thái gửi tin
  const [isOptionsOpen, setIsOptionsOpen] = useState(false); // State quản lý hiển thị menu
  const optionsRef = useRef(null); // Ref cho menu tùy chọn

  const fetchMessages = async () => {
    const response = await fetch(
      `${environment.serverURL}/api/v1/chatbot/history?userUuid=${userUuid}`
    );

    if (response.ok) {
      const chatMessages = await response.json();
      const newMessages = [];
      chatMessages.forEach((message) => {
        if (message.sender == "USER") {
          newMessages.push({
            messageType: "message",
            sender: "USER",
            message: message.message,
            createdAt: message.createdAt,
          });
        } else {
          const botMessage = {
            messageType: "message",
            sender: "BOT",
            message: message.message,
            createdAt: message.createdAt,
          };

          const transactionMessage = {
            messageType: "transaction",
            uuid: message.transaction.uuid,
            type: message.transaction.type,
            category: message.transaction.category,
            description: message.transaction.description,
            amount: message.transaction.amount,
            date: message.transaction.date,
          };

          newMessages.push(botMessage, transactionMessage);
        }
      });

      setMessages(newMessages);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => (data[key] = value));
    data.userUuid = userUuid;

    const userMessage = {
      messageType: "message",
      sender: "USER",
      message: data.message,
      createdAt: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsSending(true); // Bắt đầu hiệu ứng loading

    try {
      const response = await fetch(
        `${environment.serverURL}/api/v1/transactions:auto`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const { transaction, comment } = responseData;
        const botMessage = {
          messageType: "message",
          sender: "BOT",
          message: comment,
          createdAt: new Date(),
        };
        const transactionMessage = {
          messageType: "transaction",
          uuid: transaction.uuid,
          type: transaction.type,
          category: transaction.category,
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
        };
        setMessages([...newMessages, botMessage, transactionMessage]);
      } else {
        // Xử lý lỗi phản hồi từ server nếu cần
        console.error("Lỗi khi gửi tin nhắn:", response.status);
        const errorMessage = {
          messageType: "message",
          sender: "BOT",
          message: "Đã có lỗi xảy ra khi xử lý yêu cầu của bạn.",
          createdAt: new Date(),
        };
        setMessages([...newMessages, errorMessage]);
      }
    } catch (error) {
      console.log("Lỗi kết nối:", error);
      const errorMessage = {
        messageType: "message",
        sender: "BOT",
        message: "Không thể kết nối đến máy chủ.",
        createdAt: new Date(),
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsSending(false); // Kết thúc hiệu ứng loading
    }
  };

  const boxMessages = messages.map((message, index) => {
    if (message.messageType == "transaction") {
      return <TransactionMessage key={index} message={message} />;
    }
    return <Message key={index} message={message} />;
  });

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleAddManual = () => {
    navigate("/transactions/add");
    setIsOptionsOpen(false);
  };

  const handleLinkBank = () => {
    navigate("/bank");
    setIsOptionsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="absolute w-full h-1/3 mb-6">
        <div className="w-full h-2/3 bg-primary px-4"></div>
      </div>
      <div className="relative w-full h-1/10 flex items-center text-white">
        <Link className="absolute left-4" onClick={() => navigate(-1)}>
          <BiChevronLeft size="1.8rem" />
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h3 className="font-bold text-lg">Thêm khoản thu/chi</h3>
        </div>
        <div className="absolute right-4" ref={optionsRef}>
          <button onClick={toggleOptions}>
            <BiDotsVertical size="1.8rem" />
          </button>
          {isOptionsOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-md z-100">
              <button
                onClick={handleAddManual}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Thêm thủ công
              </button>
              <button
                onClick={handleLinkBank}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Liên kết ngân hàng
              </button>
            </div>
          )}
        </div>
      </div>
      <section className="absolute top-1/10 w-full h-9/10 p-6 flex flex-col justify-between gap-4 rounded-2xl bg-white z-50">
        <div className="w-full h-9/10 flex flex-col">
          <div className="w-full mb-4 flex flex-col items-center gap-2">
            <p className="text-gray-text text-sm">
              Ghi lại khoản thu chi của bạn tại đây!
            </p>
            <div className="p-3 bg-primary rounded-full ">
              <img src="/chatbot.svg" alt="" />
            </div>
          </div>
          <div id="chatbox" className="h-full overflow-y-scroll">
            {boxMessages}
            {isSending && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg p-2 text-sm text-gray-700">
                  <ClipLoader color="#007bff" size={20} loading={true} />
                </div>
              </div>
            )}
          </div>
        </div>
        <form className="w-full h-12 flex gap-4" onSubmit={sendMessage}>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Nhập khoản thu/chi..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full px-4 bg-gray-chat rounded-lg"
            disabled={isSending} // Vô hiệu hóa input khi đang gửi
          />
          <div className="flex items-center gap-4">
            <button type="button" disabled={isSending}>
              <BiSolidMicrophone size="1.8rem" />
            </button>
            <button type="submit" disabled={isSending || input.trim() === ""}>
              <BiSolidSend size="1.8rem" />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Chatbot;
