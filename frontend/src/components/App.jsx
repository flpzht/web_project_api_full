import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import Login from './Login/Login'
import Register from './Register/Register'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import InfoTooltip from './Main/components/Popup/components/InfoTooltip/InfoTooltip'
import api from '../utils/api'
import * as auth from '../utils/auth'
import { getToken, setToken, removeToken } from '../utils/token'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = ({ email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    auth
    .register(email, password)
    .then(() => {
      navigate('/signin');
    })
    .then(() => {
      handleOpenPopup({
        title: null,
        children: <InfoTooltip success={true} onClose={handleClosePopup} />,
      });
    })
    .catch(console.error);
    };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
    .authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setUserData({ email });
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || '/profile';
          navigate(redirectPath);
        }
      })
      .catch(() => {
        handleOpenPopup({
          title: null,
          children: <InfoTooltip success={false} onClose={handleClosePopup} />,
        });
      });
  };

   const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        navigate('/signin');
    };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
      auth
      .checkToken(jwt)
      .then((userData) => {
        setUserData({ email: userData.email });
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);


  useEffect(() => {
    if (!isLoggedIn) return;

    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(console.error);
  }, [isLoggedIn]);


  useEffect(() => {
    if (!isLoggedIn) return;

    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.error);
  }, [isLoggedIn]);


  function handleOpenPopup(popup) {
    setPopup(popup);
  };

  function handleClosePopup() {
    setPopup(null);
  };

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.changeAvatar(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }


  return (
    <>
      <Routes>
        <Route path="/signin" element={
        <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>          
            <Login handleLogin={handleLogin} onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} popup={popup} />
        </ProtectedRoute>
        } />

        <Route path="/signup" element={
        <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
          <Register handleRegistration={handleRegistration} />
        </ProtectedRoute>
        } />

        <Route path="/profile" element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar, handleCardLike, handleCardDelete, handleAddPlaceSubmit }}>
            <div className="page__content">

              <Header>
                <div className="header__profile-container">
                <p className="header__email">{userData?.email}</p>
                <button className="header__logout" type="button" onClick={handleLogout}>Sair</button>
                </div>
              </Header>

              <Main onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} popup={popup} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />

              <Footer />
            </div>
          </CurrentUserContext.Provider>
        </ProtectedRoute>
        } />

        <Route path="*" element={
        isLoggedIn ? (
        <Navigate to="/profile" replace />
      ) : (
        <Navigate to="/signin" replace />)
      } />
      </Routes>
    </>
  )
}

export default App
