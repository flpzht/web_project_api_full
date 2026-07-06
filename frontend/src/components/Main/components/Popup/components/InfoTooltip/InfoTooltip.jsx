export default function InfoTooltip({ success }) {

    return (
        <div className="popup__content popup__content_content_infoTooltip">
            <img 
                src={success ? "/images/success-icon.svg" : "/images/failure-icon.svg"} 
                alt={success ? "success icon" : "failure icon"} 
                className="popup__icon"
            />
            <h3 className="popup__title">
                {success 
                    ? "Vitória! Seu cadastro foi realizado com sucesso." 
                    : "Ops, algo deu errado. Por favor, tente novamente."
                }
            </h3>
        </div>
    );
}