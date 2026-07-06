import logo from '../../../images/logo.svg'

function Header({ children }) {

    return (
        <header className="header page__section">
            <img alt="Logotipo Around The U.S." className="logo header__logo" src={logo} />
            {children}
        </header>
    );
}

export default Header;