// src/index.ts
import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/database';
import User from './models/user/userModel';
import Role from './models/role/roleModel';
import UserRole from './models/role/userRoleModel';
import People from './models/people/peopleModel';
import Invoice from './models/invoice/invoiceModel';
import Payment from './models/payment/paymentModel';
import InvoiceDetail from './models/invoice/invoiceDetailModel';
import Product from './models/product/productModel';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Crea tablas en orden
    await User.sync();
    await Role.sync();
    await UserRole.sync();
    await People.sync();

    await Product.sync();
    await Invoice.sync();
    await Payment.sync();
    await InvoiceDetail.sync();

    console.log('Modelos sincronizados correctamente.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
  UserRole.belongsTo(Role, { foreignKey: 'idRole' });
  Role.hasMany(UserRole, { foreignKey: 'idRole' });
}

initializeDatabase();
