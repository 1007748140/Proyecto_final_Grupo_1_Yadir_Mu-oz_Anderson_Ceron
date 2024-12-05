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
exports.updateUserProfile = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const getUserProfileByUserIdSql_1 = require("../infra/getUserProfileByUserIdSql");
const updateUser_1 = require("../infra/updateUser");
const updatePeople_1 = require("../infra/updatePeople");
dotenv_1.default.config();
const updateUserProfile = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error('ID de usuario requerido');
    }
    if (updateData.email) {
        throw new Error('No se permite actualizar el correo electrónico');
    }
    if (updateData.phone && !/^\d{10}$/.test(updateData.phone)) {
        throw new Error('El teléfono debe contener exactamente 10 dígitos numéricos');
    }
    const user = new getUserProfileByUserIdSql_1.GetUserProfileSql();
    const userResponse = yield user.getUserProfileSql(userId);
    if (!userResponse) {
        throw new Error('Usuario no encontrado');
    }
    const { firstName, middleName, lastName, phone, password, idAddress, } = updateData;
    let passwordFormat = '';
    if (password) {
        passwordFormat = yield bcryptjs_1.default.hash(password, 10);
    }
    const data = {
        user: {
            password: passwordFormat || undefined,
        },
        people: {
            idUser: userId,
            firstName,
            middleName,
            lastName,
            phone,
            idAddress,
        },
    };
    const updateUserData = new updateUser_1.UpdateUserSql();
    const updatePeopleData = new updatePeople_1.UpdatePeopleSql();
    const updateUser = yield updateUserData.updateUserSql(data.user, userId);
    yield updatePeopleData.updatePeopleSql(data.people, userId);
    return updateUser;
});
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=updateUserProfileService.js.map