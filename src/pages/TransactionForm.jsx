import React, { useState, useEffect, useContext } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useParams, useNavigate, Link } from "react-router-dom";
import environment from "../environments/environment";
import { LoginContext } from "../contexts/LoginContext";

const TransactionForm = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    type: "EXPENSE",
    category: "",
    description: "",
    amount: 0,
    date: formatDate(new Date()),
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({}); // State để theo dõi lỗi
  const { userUuid } = useContext(LoginContext);

  useEffect(() => {
    if (uuid) {
      setIsEditMode(true);
      fetchTransaction(uuid);
    } else {
      setIsEditMode(false);
      setTransaction({
        type: "EXPENSE",
        category: "",
        description: "",
        amount: 0,
        date: formatDate(new Date()),
      });
    }
  }, [uuid]);

  const fetchTransaction = async (id) => {
    try {
      const response = await fetch(
        `${environment.serverURL}/api/v1/transactions/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setTransaction(data);
      } else {
        console.error("Lỗi khi tải giao dịch");
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${environment.serverURL}/api/v1/categories`
      );
      if (response.ok) {
        const categoryData = await response.json();
        setCategories(categoryData);
      } else {
        console.error("Lỗi khi tải danh mục");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
    // Xóa lỗi cho trường này khi giá trị thay đổi
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditMode) {
      updateTransaction();
    } else {
      createTransaction();
    }
    navigate(-1);
  };

  const createTransaction = async () => {
    try {
      const body = { userUuid: userUuid, ...transaction };
      delete body.uuid;
      const response = await fetch(
        `${environment.serverURL}/api/v1/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Giao dịch đã được tạo:", data);
      } else {
        console.error("Lỗi khi tạo giao dịch");
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };

  const updateTransaction = async () => {
    try {
      const body = { ...transaction };
      delete body.uuid;
      const response = await fetch(
        `${environment.serverURL}/api/v1/transactions/${uuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Giao dịch đã được cập nhật:", data);
      } else {
        console.error("Lỗi khi cập nhật giao dịch");
      }
    } catch (error) {
      console.error("Lỗi mạng:", error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!transaction.type) {
      errors.type = "Loại giao dịch không được để trống";
    }
    if (transaction.type === "EXPENSE" && !transaction.category) {
      errors.category = "Danh mục không được để trống";
    }
    if (!transaction.description) {
      errors.description = "Mô tả không được để trống";
    }
    if (transaction.amount === null || transaction.amount <= 0) {
      errors.amount = "Số tiền phải lớn hơn 0";
    }
    if (!transaction.date) {
      errors.date = "Ngày không được để trống";
    }
    return errors;
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <form
      className="flex flex-col items-center w-screen h-screen px-8 pb-30 bg-gray-100"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full h-1/10 flex items-center text-black">
        <Link className="absolute left-4" onClick={() => navigate(-1)}>
          <BiChevronLeft size="1.8rem" />
        </Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          {isEditMode ? "Chỉnh sửa giao dịch" : "Thêm giao dịch"}
        </h2>
        <div>
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Loại giao dịch
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
            value={transaction.type}
            onChange={handleChange}
          >
            <option value="">Chọn loại giao dịch</option>
            <option value="EXPENSE">Chi tiêu</option>
            <option value="INCOME">Thu nhập</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs italic">{errors.type}</p>
          )}
        </div>
        {transaction.type === "EXPENSE" && (
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Danh mục
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
              value={transaction.category}
              onChange={handleChange}
              disabled={transaction.type === "INCOME"}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs italic">{errors.category}</p>
            )}
          </div>
        )}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mô tả
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
            placeholder="Nhập mô tả giao dịch"
            value={transaction.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Số tiền
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
            placeholder="Nhập số tiền"
            value={transaction.amount}
            onChange={handleChange}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs italic">{errors.amount}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ngày
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
            value={transaction.date}
            onChange={handleChange}
          />
          {errors.date && (
            <p className="text-red-500 text-xs italic">{errors.date}</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:shadow-outline"
          >
            {isEditMode ? "Lưu thay đổi" : "Thêm giao dịch"}
          </button>
          {isEditMode && (
            <button
              type="button"
              className="w-full bg-red-700 text-white font-bold py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:shadow-outline"
            >
              Xóa
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
