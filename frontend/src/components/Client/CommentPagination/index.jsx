import React, { useState } from "react";
import { Pagination } from "antd";

function CommentPagination({ commentsPerPage, totalComments, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const totalPages = Math.ceil(totalComments / commentsPerPage);

  return (
    <div>
      <Pagination
        current={currentPage}
        total={totalComments}
        pageSize={commentsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper
      />
    </div>
  );
}

export default CommentPagination;
