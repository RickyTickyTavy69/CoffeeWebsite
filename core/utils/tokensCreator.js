import jwt from "jsonwebtoken";

class TokensCreator{

    static createTokens(username, accessSecret, refreshSecret) {
        const accessToken = jwt.sign({username}, accessSecret, {expiresIn: '60s'});
        const refreshToken = jwt.sign({username}, refreshSecret, {expiresIn: '1d'});
        return {accessToken, refreshToken};
    }
}

export default TokensCreator;