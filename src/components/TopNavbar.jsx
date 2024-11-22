import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';

const TopNavbar = ({ setSearchTerm }) => {
  const [searchVisible, setSearchVisible] = useState(false); // Trạng thái hiển thị ô tìm kiếm
  const [inputValue, setInputValue] = useState(""); // Giá trị của input

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue); // Gửi từ khóa tìm kiếm về App.js
      setSearchVisible(false); // Đóng ô tìm kiếm
    }
  };

  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon" />
      <h2>
        Following | <span>For You</span>
      </h2>
      <div className="search-section">
        <FontAwesomeIcon
          icon={faSearch}
          className="icon"
          onClick={() => setSearchVisible(!searchVisible)} // Hiển thị ô tìm kiếm khi click
        />
        {searchVisible && (
          <input
            type="text"
            placeholder="Search hashtag..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch} // Xử lý tìm kiếm khi nhấn Enter
            className="search-input"
          />
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
