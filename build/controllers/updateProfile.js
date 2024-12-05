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
exports.updateProfile = void 0;
const updateUserProfileService_1 = require("../services/updateUserProfileService");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params ? req.params.userId : null;
        const user = yield (0, updateUserProfileService_1.updateUserProfile)(Number(userId), req.body);
        res.status(200).json({ message: 'Perfil actualizado', user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateProfile = updateProfile;
//# sourceMappingURL=updateProfile.js.map