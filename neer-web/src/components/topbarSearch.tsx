/* eslint-disable @next/next/no-img-element */
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const TopbarSearch = ({
  title = "Dashboard",
  setSearch,
  Component,
}: {
  title?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
  Component?: () => JSX.Element;
}) => {
  return (
    <header className="flex items-center justify-between font-montserrat text-2xl font-bold">
      <h2>{title}</h2>
      <div className="right flex items-center gap-4">
        {Component && <Component />}
        {setSearch && (
          <div className="search flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-lato font-normal">
            <input
              type="text"
              className="text-base outline-none"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="text-slate-500">
              <SearchIcon size="1.15rem" />
            </span>
          </div>
        )}
        <div className="avatar h-10 w-10">
          <img
            src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
            alt=""
          />
        </div>
      </div>
    </header>
  );
};

export default TopbarSearch;
