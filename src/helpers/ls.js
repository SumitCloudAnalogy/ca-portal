import SecureLS from "secure-ls";
import constants from "./constants";

export default new SecureLS({
        encryptionSecret: constants.LS_SECRET
    });

