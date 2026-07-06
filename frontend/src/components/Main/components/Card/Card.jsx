import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";

export default function Card(props) {
    const { name, link, isLiked, onOpenPopup, onClosePopup } = props.card;
    const { onCardLike, onCardDelete } = props;

    const imageComponent = {
        title: null,
        children: <ImagePopup card={props.card} />
    };

    const removeCard = {
        title: 'Remove Confirmation',
        children: <RemoveCard onClose={onClosePopup} onConfirm={handleDeleteClick} />
    };

    const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_is-active' : ''}`;

    function handleLikeClick() {
        onCardLike(props.card);
    }

    function handleDeleteClick() {
        onCardDelete(props.card);
        onClosePopup();
    }

    return (
        <li className="card" >
            <img src={link} alt={name} className="card__image" onClick={() => onOpenPopup(imageComponent)} />
            <button className="card__delete-button" aria-label="Delete card" type="button" onClick={() => onOpenPopup(removeCard)} />
            <div className="card__description">
                <h2 className="card__title">{name}</h2>
                <button className={cardLikeButtonClassName} aria-label="Like card" type="button" onClick={handleLikeClick} />
            </div>
        </li>
    );
}