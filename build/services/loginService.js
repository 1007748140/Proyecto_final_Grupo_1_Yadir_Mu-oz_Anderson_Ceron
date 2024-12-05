"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const loginSql_1 = require("../infra/loginSql");
dotenv_1.default.config();
const loginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const user = new loginSql_1.GetLoginSql();
    const userResponse = yield user.getLoginSql(email);
    console.log(userResponse, 'userResponse');
    if (!userResponse) {
        throw new Error('Usuario no encontrado');
    }
    const isMatch = yield bcryptjs_1.default.compare(password, userResponse.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }
    const token = jsonwebtoken_1.default.sign({ id: userResponse.dataValues.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
});
exports.loginUser = loginUser;
//# sourceMappingURL=loginService.js.map