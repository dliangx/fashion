import { Link } from "react-router-dom";
import { MenuIcon, SearchIcon } from "./Icon";
import { Logo } from "./Logo";

const Header = () => {
  return (
    <div className="flex h-10 pt-2 items-end w-full">
      <Link to="/menu">
        <MenuIcon className="ml-4" />
      </Link>
      <Link className=" m-auto" to="/">
        <Logo className="h-8 m-auto" />
      </Link>

      <Link to="/search">
        <SearchIcon className="mr-4" />
      </Link>
    </div>
  );
};

export default Header;
