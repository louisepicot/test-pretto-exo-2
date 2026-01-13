import "./Header.css";

import { Dropdown } from "./Dropdown";
import logoPretto from "@/assets/svg/logo-pretto.svg";

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logoPretto} alt="Pretto" />
        </div>

        <Dropdown />
      </div>
    </header>
  );
}
