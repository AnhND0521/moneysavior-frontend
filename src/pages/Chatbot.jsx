import React, { useContext, useEffect, useState } from "react"
import { BiChevronLeft, BiSolidMicrophone, BiSolidSend } from "react-icons/bi"
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import Message from "../components/Message";
import TransactionMessage from "../components/TransactionMessage";

const Chatbot = () => {
  const { userUuid } = useContext(LoginContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const fetchMessages = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/chatbot/history?userUuid=${userUuid}`);

    if (response.ok) {
      const chatMessages = await response.json();
      const newMessages = [];
      chatMessages.forEach(message => {
        if (message.sender == "USER") {
          newMessages.push({
            messageType: "message",
            sender: "USER",
            message: message.message,
            createdAt: message.createdAt,
          });
        }
        else {
          const botMessage = {
            messageType: "message",
            sender: "BOT",
            message: message.message,
            createdAt: message.createdAt,
          };

          const transactionMessage = {
            messageType: "transaction",
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
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {}
    formData.forEach((value, key) => data[key] = value);
    data.userUuid = userUuid;

    const userMessage = {
      messageType: "message",
      sender: "USER",
      message: data.message,
      createdAt: new Date(),
    }

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/transactions:auto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const responseData = await response.json();
        const { transaction, comment } = responseData;
        const botMessage = {
          messageType: "message",
          sender: "BOT",
          message: comment,
          createdAt: new Date(),
        }
        const transactionMessage = {
          messageType: "transaction",
          type: transaction.type,
          category: transaction.category,
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
        }
        setMessages([...newMessages, botMessage, transactionMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const boxMessages = messages.map((message, index) => {
    if (message.messageType == "transaction") {
      return (
        <TransactionMessage
          key={index}
          message={message}
        />
      )
    }
    return (
      <Message
        key={index}
        message={message}
      />
    )}
  )

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="absolute w-full h-1/3 mb-6">
        <div className="w-full h-2/3 bg-primary px-4">
        </div>
      </div>
      <div className="relative w-full h-1/10 flex items-center text-white">
        <Link to="/" className="absolute left-4">
          <BiChevronLeft size="1.8rem"/>
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h3 className="font-bold text-lg">Thêm khoản thu/chi</h3>
        </div>
      </div>
      <section className="absolute top-1/10 w-full h-9/10 p-6 flex flex-col justify-between gap-4 rounded-2xl bg-white z-50">
        <div className="w-full h-9/10 flex flex-col">
          <div className="w-full mb-4 flex flex-col items-center gap-2">
            <p className="text-gray-text text-sm">Ghi lại khoản thu chi của bạn tại đây!</p>
            <div className="p-3 bg-primary rounded-full ">
              <img src="/chatbot.svg" alt="" />
            </div>
          </div>
          <div id="chatbox" className="h-full overflow-y-scroll">
            {boxMessages}
          </div>
          
        </div>
        <form className="w-full h-12 flex gap-4"
          onSubmit={sendMessage}
        >
          <input 
            type="text" 
            name="message" 
            id="message" 
            placeholder="Nhập khoản thu/chi..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-full px-4 bg-gray-chat rounded-lg"
          />
          <div className="flex items-center gap-4">
            <button>
              <BiSolidMicrophone size="1.8rem" />
            </button>
            <button type="submit">
              <BiSolidSend size="1.8rem" />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Chatbot