import React, { useState, useRef, useEffect } from 'react';

const CustomCombobox = ({ options, value, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || '');
    setFilteredOptions(options);
  }, []);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
    const newFilteredOptions = options.filter(option =>
      option.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions([option]);
    onChange(option);
    setIsOpen(false);
    inputRef.current.focus();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = (event) => {
    // Delay đóng dropdown để xử lý click trên option
    setTimeout(() => {
      if (!dropdownRef.current?.contains(event.relatedTarget)) {
        setIsOpen(false);
      }
    }, 100);
  };

  return (
    <div className="relative">
      <label htmlFor="combobox-input" className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        ref={inputRef}
        type="text"
        id="combobox-input"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
        placeholder={placeholder ? placeholder : ''}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul ref={dropdownRef} className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-md z-10 border border-gray-200 max-h-48 overflow-y-auto z-100">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomCombobox;