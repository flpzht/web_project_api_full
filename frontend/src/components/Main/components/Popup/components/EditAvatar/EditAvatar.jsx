import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {

    const { handleUpdateAvatar } = useContext(CurrentUserContext);
    const avatarRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();

        handleUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <form className="popup__form" name="edit-avatar-form" id="edit-avatar-form" onSubmit={handleSubmit}>
            <label className="popup__field">
                <input id="avatar-link" className="popup__input popup__input_type_url" name="avatar-link" placeholder="Link to new profile picture" type="url" required ref={avatarRef} onChange={handleUpdateAvatar}/>
                <span className="popup__error" id="avatar-link-error"></span>
            </label>
            <button className="button popup__button" type="submit">Salvar</button>
        </form>
    );
}