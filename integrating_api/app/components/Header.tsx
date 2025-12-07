import React from "react";

const Header = (num: number) => {
  return (
    <div className="flex flex-row mt-16 justify-between items-center m-8">
      <div>
        <h1 className="text-blue-950 font-black text-3xl">Opportunities</h1>
        <p className="text-gray-500">Showing {num} results</p>
      </div>
      <div className="flex flex-row gap-2">
        <label htmlFor="sort" className="text-gray-500">
          Sort by:{" "}
        </label>
        <select name="sort" id="sort" className="font-medium text-center">
          <option value="most-relevant">Most relevant</option>
          <option value="ascendingly">Ascendingly</option>
          <option value="descendingly">Descendingly</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
