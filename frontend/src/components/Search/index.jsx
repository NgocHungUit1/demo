import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';

function SearchBar({ onSearch, placeholder }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: '500px' }}
      />
      <Button onClick={handleSearch}
        style={{
          marginLeft: '10px', height: '32px',
          backgroundColor: '#6a0dad', color: '#fff'
        }}>
        Search
      </Button>

    </div>
  );
}

export default SearchBar;