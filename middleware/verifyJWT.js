import jwt from "jsonwebtoken";
import config from "config";
import User from "../models/userModel.js";
import tokensCreator from "../core/utils/tokensCreator.js";



const verifyJWT = (req, res, next) => {
    console.log("cookies", req.cookies);

    const body = req.body;
    const authHeader = req.headers["authorization"]; // das ist das, was ich von meinem Front End zum Back End senden
    // werde, also muss ich beim fetch() diese Header dann genauso mitschicken.
    if (!authHeader) {
        console.log("@ verify, !auth");
        return res.status(401).json({message: "not authorized"});  // code 401 bedeutet "unauthorized";
    }
    console.log("authHeader", authHeader);   // sollte "Bearer token" sein.
    const token = authHeader.split(" ")[1];  // weil im String "Bearer token" der token auf dem zweiten Platz ist.
    jwt.verify(
        token,
        config.get("accessTokenSecret"),
        (error, decoded) => {
            if(error) {
                console.log("error", error);
                const refreshToken = req.cookies.jwt;
                const username = req.body.username;
                console.log("creating Access token...");
                createAccessToken(refreshToken, username);

                // return res.status(403).json({message: "access forbidden"});
                // Hier muss ein neues AccessToken generiert werden, falls er expired ist.
                // Dafür muss ich jedes mal den RefreshToken hierher senden, um ihn dann zu benutzen, wenn ich einen
                // neuen generieren muss. Ich muss aber unterscheiden, ob es keinen gibt oder ob er expired ist.

                // !!!! ich denke, ich muss einfach den RefreshToken vom Client aus der Cookie hier senden und dann
                // !!!! mit dem in der Datenbank vergleichen. Aber wie denn?
            } else{
            console.log("decoded data verifyJWT", decoded); // !!!!! aus irgendeinem Grund ist der username in dem
            // decoded Objekt in '"doppelten quoten"'. Ich weiss nicht, wieso deshalb mache ich hier slice und versuche
            // es später herauszufinden, wieso es doppelte sind.

            let userName = decoded.username.slice(1, decoded.username.length -1); // !!!!!!! das sollte man nicht tun, sondern herausfinden wo der Fehler ist
            console.log("new updated username without quotes", userName);
            req.user = userName;                            // nach der Verification wird dann der username in die req variable gepackt.
            next();                                         // next() im middleware setzt die Hauptfunktion fort.
            }
        }
    );

    async function createAccessToken(refreshToken, username){
        const user = await User.findOne( {name : username} );
        const refreshTokenDB = user.refreshToken;
        if(refreshToken === refreshTokenDB){
            const accessSecret = config.get("jwtSecret");
            const refreshSecret = config.get("jwtSecret");
            const jwtTokens = await tokensCreator.createTokens( JSON.stringify(username), accessSecret, refreshSecret);
            const accessToken = jwtTokens.accessToken;
            req.user = username;
            req.accessToken = accessToken;
            next();
        }
    }
}



export default verifyJWT;


// dieses Authentication middleware ist dazu gemacht um bei den Anfragen auf den Server, die vom Front End kommen den
// Access Token zu verifizieren und die Anfrage durchzulassen oder ggf. wenn der token nicht verifiziert werden kann,
// den Zugriff zu verweigern.























