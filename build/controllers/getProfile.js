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
exports.getProfile = void 0;
const getUserProfileService_1 = require("../services/getUserProfileService");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new Error('Usuario no autenticado');
        }
        const userProfile = new getUserProfileService_1.GetUserProfile();
        const user = yield userProfile.getUserProfile(req.user.id);
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    profile: {
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        phone: user.phone,
                        idAddress: user.idAddress,
                    },
                },
            },
        });
    }
    catch (error) {
        console.error('Error en getProfile controller:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'Error al obtener el perfil del usuario',
        });
    }
});
exports.getProfile = getProfile;
//# sourceMappingURL=getProfile.js.map