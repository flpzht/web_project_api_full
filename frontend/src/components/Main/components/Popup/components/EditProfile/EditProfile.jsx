import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {

    const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateUser({ name, about: description });
    };

    return (
        <form className="popup__form" name="edit-profile-form" id="edit-profile-form" noValidate onSubmit={handleSubmit}>
            <label className="popup__field">
            <input id="profile-name" className="popup__input popup__input_type_profile-name" name="profile-name" placeholder="Name" type="text" minlength="1" maxlength="40" required value={name} onChange={handleNameChange} />
            <span className="popup__error" id="profile-name-error"></span>
            </label>
            <label className="popup__field">
            <input id="profile-description" className="popup__input popup__input_type_profile-description" name="profile-description" placeholder="About me" type="text" minlength="1" maxlength="200" required value={description} onChange={handleDescriptionChange} />
            <span className="popup__error" id="profile-description-error"></span>
            </label>
            <button className="button popup__button" type="submit">Salvar</button>
        </form>
    );
}