import { useContext } from 'react';
import Popup from './components/Popup/Popup';
import NewCard from './components/Popup/components/NewCard/NewCard';
import EditAvatar from './components/Popup/components/EditAvatar/EditAvatar';
import EditProfile from './components/Popup/components/EditProfile/EditProfile';
import Card from './components/Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Main(props) {
    const { cards, onCardLike, onCardDelete, popup, onOpenPopup, onClosePopup } = props;
    const { currentUser } = useContext(CurrentUserContext);


    const newCardPopup = {
        title: 'New Card',
        children: <NewCard />
    };

    const editAvatarPopup = {
        title: 'Edit Avatar',
        children: <EditAvatar />
    };

    const editProfilePopup = {
        title: 'Edit Profile',
        children: <EditProfile />
    };

    

    return (
        <main className="content">
            <section className="profile page__section">
                <div className="profile__avatar">
                    <img className="profile__image" src={currentUser?.avatar} alt="Avatar" />
                    <button aria-label="Edit avatar" className="profile__avatar-button" type="button"  onClick={() => onOpenPopup(editAvatarPopup)}/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser?.name}</h1>
                    <button aria-label="Edit profile" className="profile__edit-button" type="button" onClick={() => onOpenPopup(editProfilePopup)} />
                    <p className="profile__description">{currentUser?.about}</p>
                </div>
                <button aria-label="Add card" className="profile__add-button" type="button" onClick={() => onOpenPopup(newCardPopup)} />
            </section>
            <section className="cards page__section">
                <ul className="cards__list">
                    {cards.map((card) => {
                        const isLiked = card.likes.some((id) => id === currentUser._id);
                        return <Card key={card._id} card={{ ...card, isLiked, onOpenPopup, onClosePopup }} onCardLike={onCardLike} onCardDelete={onCardDelete} />;
                    })}
                </ul>
            </section>

            {popup && (
                <Popup onClose={onClosePopup} title={popup.title}>
                    {popup.children}
                </Popup>
            )}

        </main>
    );
};

export default Main;