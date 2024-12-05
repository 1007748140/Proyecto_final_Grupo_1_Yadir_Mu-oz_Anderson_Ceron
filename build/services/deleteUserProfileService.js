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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserProfile = void 0;
const deletePeopleSql_1 = require("../infra/deletePeopleSql");
const deleteUserSql_1 = require("../infra/deleteUserSql");
class DeleteUserProfile {
    deleteUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error('ID de usuario requerido');
            }
            try {
                const people = new deletePeopleSql_1.DeletePeopleSql();
                const user = new deleteUserSql_1.DeleteUserSql();
                yield Promise.all([
                    people.deletePeopleSql(userId),
                ]);
                const responseUser = yield user.deleteUserSql(userId);
                if (responseUser === 0) {
                    throw new Error('Usuario no encontrado');
                }
                return responseUser;
            }
            catch (error) {
                throw new Error(error.message || 'Error al eliminar el perfil');
            }
        });
    }
}
exports.DeleteUserProfile = DeleteUserProfile;
//# sourceMappingURL=deleteUserProfileService.js.map