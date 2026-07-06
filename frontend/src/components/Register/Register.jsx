import { Link } from "react-router-dom";
import { useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Register = ({ handleRegistration }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
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
        handleRegistration(data);
    };

    return (
        <div className="register">
            <Header>
                <Link className="header__link" to="/signin">Faça o login</Link>
            </Header>
            <div className="register__content">
                <h2 className="register__title">Inscrever-se</h2>
                <form className="register__form" onSubmit={handleSubmit}>
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
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Senha"
                        required
                        value={data.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit">Inscrever-se</button>
                </form>
                <div className="register__signup">
                    <p>Já é um membro? <Link to="/signin">Faça o login aqui!</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;