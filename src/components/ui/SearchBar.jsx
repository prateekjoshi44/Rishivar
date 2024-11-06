import { useRef } from 'react';
import AstroFilterModal from "../modal/AstroFilterModal";
import AstroSortModal from "../modal/AstroSortModal";
import Icons from "../ui/Icons";

const SearchBar = ({ search, setSearch, setOrderBy, setLanguages, setSkills, setCategories, setIcons }) => {
  const inputRef = useRef(null);



  return (
    <div className=" mt-1 d-flex align-items-center  mb-3   px-2 bg-white overflow-hidden shadow-sm rounded-10 border border-warning ">


      <label htmlFor="search" style={{ backgroundColor: "#FFFFFF" }}>
        {Icons.search("fs-3")}
      </label>

      <input
        id='search'
        ref={inputRef}
        // style={{ border: 'none', outline: 'none' }}
        type="text"
        className="form-control overflow-hidden text-primary outline-none" placeholder="Search for Astrologers"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />


      {setIcons ? (
        <div className="d-flex">
          <AstroFilterModal setLanguages={setLanguages} setSkills={setSkills} setCategories={setCategories} />
          <AstroSortModal setOrderBy={setOrderBy} />
        </div>
      ) : null}

    </div>



  )


};

export default SearchBar;
