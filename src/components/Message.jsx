import React from 'react'

const Message = (props) => {
  const { sender, message, createdAt } = props.message;

  return (
    <div className={`w-full flex ${sender == "USER" ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-4/5 py-2 px-4 rounded-xl
        ${sender == "USER" ? "text-black" : "text-white"}
        ${sender == "USER" ? "bg-gray-message" : "bg-primary"}`}
      >
        {message}
      </div>
      
    </div>
  )
}

export default Message