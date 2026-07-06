import { useContext, useRef } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';


export default function NewCard() {

    const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
    const newCardNameRef = useRef();
    const newCardLinkRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        handleAddPlaceSubmit({
            name: newCardNameRef.current.value,
            link: newCardLinkRef.current.value
        });
    }

    return (
        <form className="popup__form" name="card-form" id="new-card-form" noValidate onSubmit={handleSubmit}>
            <label className="popup__field">
            <input id="card-name" className="popup__input popup__input_type_card-name" name="card-name" placeholder="Title" type="text" minlength="1" maxlength="30" required ref={newCardNameRef} />
            <span className="popup__error" id="card-name-error"></span>
            </label>
            <label className="popup__field">
            <input id="card-link" className="popup__input popup__input_type_url" name="link" placeholder="Image Link" type="url" required ref={newCardLinkRef}/>
            <span className="popup__error" id="card-link-error"></span>
            </label>
            <button className="button popup__button" type="submit">Salvar</button>
        </form>
    );
}