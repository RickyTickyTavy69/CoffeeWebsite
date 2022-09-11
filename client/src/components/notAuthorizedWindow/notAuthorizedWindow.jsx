import notAuthorizedStyles from "./notAuthorized.module.css";

// diese Komponente wird dem nicht autorisierten Benutzer angezeigt, falls er Produkte hinzufügen möchte
// um ihn zu überzeugen ein Account anzulegen.

const NotAuthorizedWindow = () => {

    return (

            <div className={notAuthorizedStyles.window}>
                    <p className={notAuthorizedStyles.message}>You are not authorized. Sign Up to get advantages as a registered User</p>
                    <div className={notAuthorizedStyles.buttons}>
                        <div className={notAuthorizedStyles.button_container}>
                            <button className={`${notAuthorizedStyles.button} ${notAuthorizedStyles.bright}`}>Sign Up</button>
                        </div>
                        <div className={notAuthorizedStyles.button_container}>
                            <button className={`${notAuthorizedStyles.button} ${notAuthorizedStyles.darked}`}>Continue as a guest</button>
                        </div>

                    </div>
            </div>

    )
}


export default NotAuthorizedWindow;