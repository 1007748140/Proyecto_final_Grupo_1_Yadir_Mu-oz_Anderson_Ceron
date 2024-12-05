// src/index.ts
import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/database';
import User from './models/userModel';
import Role from './models/roleModel';
import UserRole from './models/userRoleModel';
import People from './models/peopleModel';
import Invoice from './models/invoiceModel';
import Payment from './models/paymentModel';
import InvoiceDetail from './models/invoiceDetailModel';
import Product from './models/productModel';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Crear tablas en orden correcto
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
