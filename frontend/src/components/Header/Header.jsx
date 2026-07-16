import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './Header.css'

/**
 * Barre de navigation principale affichée en haut de toutes les pages.
 * @returns {JSX.Element} Le header de l'application.
 */
function Header() {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo">
        <img src={logo} alt="Logo SportSee" className="header__logo-icon" />
        <span className="header__logo-name">SportSee</span>
      </NavLink>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li>
            <NavLink to="/" className="header__nav-link">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/12" className="header__nav-link">
              Profil
            </NavLink>
          </li>
          <li>
            <NavLink to="/reglage" className="header__nav-link">
              Réglage
            </NavLink>
          </li>
          <li>
            <NavLink to="/communaute" className="header__nav-link">
              Communauté
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
