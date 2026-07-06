import { Link } from "react-router-dom";
import { useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Popup from "../Main/components/Popup/Popup";
import InfoTooltip from "../Main/components/Popup/components/InfoTooltip/InfoTooltip";


const Login = (props) => {
     const { onClosePopup, handleLogin, popup } = props;

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(data);
    };


    return (
        <div className="login">
            <Header>
                <Link className="header__link" to="/signup">
                    Inscreva-se
                </Link>
            </Header>
            {popup && (
                <Popup onClose={onClosePopup} title={popup.title}>
                    {popup.children}
                </Popup>
            )}
            <div className="login__content">
                <h2 className="login__title">Entrar</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        required
                        value={data.email}
                        onChange={handleChange}
                    />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Senha"
                        required
                        value={data.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Entrar</button>
                </form>
                <div className="login__signup">
                    <p>Ainda não é membro? <Link to="/signup">Inscreva-se aqui!</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;