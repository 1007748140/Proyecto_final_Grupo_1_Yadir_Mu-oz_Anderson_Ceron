"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const userRoleRoutes_1 = __importDefault(require("./routes/userRoleRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const invoiceDetailRoutes_1 = __importDefault(require("./routes/invoiceDetailRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
const swaggerDocument = yamljs_1.default.load('./docs/swagger.yaml');
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(userRoutes_1.default);
app.use(roleRoutes_1.default);
app.use(userRoleRoutes_1.default);
app.use(invoiceRoutes_1.default);
app.use(paymentRoutes_1.default);
app.use(invoiceDetailRoutes_1.default);
app.use(errorHandler_1.default);
app.get('/', (_req, res) => {
    res.send('Api Itp');
});
exports.default = app;
//# sourceMappingURL=app.js.map