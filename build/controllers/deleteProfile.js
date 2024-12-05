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
exports.deleteProfile = void 0;
const deleteUserProfileService_1 = require("../services/deleteUserProfileService");
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params ? req.params.userId : null;
        const userProfile = new deleteUserProfileService_1.DeleteUserProfile();
        const user = yield userProfile.deleteUserProfile(Number(userId));
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteProfile = deleteProfile;
//# sourceMappingURL=deleteProfile.js.map