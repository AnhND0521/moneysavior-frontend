import React, { useEffect, useState } from 'react'

const InputForm = () => {
  const [uuid, setUuid] = useState("");
  const [input, setInput] = useState({
    type: "EXPENSE",
    category: "Nhà ở",
    description: "",
    amount: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/accounts:fake-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "chonamki@gmail.com" })
    })
    .then((res) => res.json())
    .then((data) => setUuid(data)); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(prevInput => ({...prevInput, [name]: value}));
    if (name == "type" && value == "INCOME") {
      setInput(prevInput => ({...prevInput, category: null}));
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select name="type" id="type" onChange={handleChange}>
          <option value="EXPENSE">Chi tiêu</option>
          <option value="INCOME">Thu nhập</option>
        </select>
        <select name="category" id="category" onChange={handleChange} disabled={input.type == "INCOME"}>
          <option value="EXPENSE">Nhà ở</option>
          <option value="INCOME">Đi lại</option>
          <option value="Ăn uống">Ăn uống</option>
          <option value="Mua sắm">Mua sắm</option>
          <option value="Giải trí">Giải trí</option>
          <option value="Giáo dục">Giáo dục</option>
          <option value="Sức khỏe">Sức khỏe</option>
          <option value="Khác">Khác</option>
        </select>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Số tiền"
          value={input.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Mô tả"
          value={input.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default InputForm