"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map