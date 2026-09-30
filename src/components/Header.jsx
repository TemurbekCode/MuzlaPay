import { FrozenDollarIcon } from "./Icon";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__mark">
          <FrozenDollarIcon id="header" size={26} />
        </div>
        <div className="header__name">MuzlaPay</div>
      </div>
      <a className="header__seller-link" href="/dashboard">
        Sotuvchi profili
      </a>
    </header>
  );
}