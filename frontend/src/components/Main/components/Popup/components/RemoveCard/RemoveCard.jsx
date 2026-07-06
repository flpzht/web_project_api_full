export default function RemoveCard(props) {
    const { onClose, onConfirm } = props;
    return (
        <>
            <h3 className="popup__title">Are you sure?</h3>
            <button className="button popup__button" type="submit" onClick={onConfirm} onClose={onClose} >Confirm</button>
        </>
    )
};