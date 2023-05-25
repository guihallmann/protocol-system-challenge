import React from "react";
import { Link } from "react-router-dom";
import {
  UserPlusIcon,
  DocumentIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

interface HeaderProps {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
  searchText: string;
  handleSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder: string;
  handleSearch: () => void;
  btnEnabled: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  handleChange,
  selectedOption,
  searchText,
  handleSearchText,
  searchPlaceholder,
  handleSearch,
  btnEnabled,
  handleLogout,
}) => {
  const linkStyle =
    "flex items-center gap-3 text-lg font-bold text-white hover:text-indigo-200";
  const linkIconStyle = "h-6 w-6 text-white";
  const selectStyle = "w-32 rounded-sm focus:outline-indigo-300";
  const inputStyle =
    "w-full p-2 rounded-sm focus:outline-none focus:outline-indigo-300";
  const btnStyleEnabled =
    "text-white font-bold p-2 bg-emerald-500 rounded-sm cursor-pointer";
  const btnStyleDisabled =
    "text-white font-bold p-2 bg-zinc-400 rounded-sm cursor-not-allowed";
  const btnLogoutStyle =
    "flex items-center font-bold text-white hover:text-indigo-200";
  const btnLogoutIconStyle = "h-6 w-6 text-white";

  return (
    <section className="flex items-center justify-between p-6 bg-indigo-500 mb-4">
      <div className="flex gap-8">
        <Link className={linkStyle} to="/register/person">
          Cadastrar requerente
          <UserPlusIcon className={linkIconStyle} />
        </Link>
        <Link className={linkStyle} to="/register/protocol">
          Cadastrar protocolo
          <DocumentIcon className={linkIconStyle} />
        </Link>
      </div>
      <div className="flex flex-grow justify-between gap-2 mx-10">
        <select
          className={selectStyle}
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Pesquisar por</option>
          <option value="person">Requerentes</option>
          <option value="protocol">Protocolos</option>
        </select>
        <input
          className={inputStyle}
          type="text"
          placeholder={searchPlaceholder}
          name="search"
          value={searchText}
          onChange={handleSearchText}
        />
        <button
          className={btnEnabled ? btnStyleEnabled : btnStyleDisabled}
          type="button"
          onClick={handleSearch}
          disabled={!btnEnabled}
        >
          Pesquisar
        </button>
      </div>
      <div className="flex">
        <button className={btnLogoutStyle} type="button" onClick={handleLogout}>
          Sair
          <ArrowRightOnRectangleIcon className={btnLogoutIconStyle} />
        </button>
      </div>
    </section>
  );
};

export default Header;
