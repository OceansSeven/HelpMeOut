import React, { useState } from "react";

function Search({ sortBy }) {
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <select>

      </select>
    </div>
  );
}