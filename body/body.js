import { verifyToken } from "../../utils/verify-token.js"
import { getName } from "../../utils/get-name.js"

const url = "../login-page/login.html"

verifyToken(url)
getName()