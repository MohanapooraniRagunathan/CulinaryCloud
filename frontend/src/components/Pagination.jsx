import React, { useState, useEffect } from "react";

const Pagination = ({ skip, setSkip, limit, total }) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;
  const [pageInput, setPageInput] = useState(currentPage);

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setSkip((page - 1) * limit);
  };

  return (
    <div className="pagination-container">
      {/* Prev Button */}
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>

      {/* Page Input + Go */}
      <div className="goto-box">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") goToPage(Number(pageInput));
          }}
        />
        <button onClick={() => goToPage(Number(pageInput))}>Go</button>
      </div>

      {/* Next Button */}
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;