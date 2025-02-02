import { DataTypes } from 'sequelize';
import sequelize from './config_db.js';

// User Model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "Name must not be empty" } }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: "First name must not be empty" } }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true, notEmpty: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Cart Model
const Cart = sequelize.define("Cart", {});

// Wishlist Model
const Wishlist = sequelize.define("Wishlist", {});

// Product Model
const Product = sequelize.define("Product", {
    code: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    internalReference: { type: DataTypes.STRING },
    shellId: { type: DataTypes.INTEGER },
    inventoryStatus: {
        type: DataTypes.ENUM("INSTOCK", "LOWSTOCK", "OUTOFSTOCK"),
        defaultValue: "INSTOCK",
    },
    rating: { type: DataTypes.DECIMAL(2, 1) }
});

// Associations
User.hasOne(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasOne(Wishlist, { foreignKey: "userId",onDelete: "CASCADE" });

Cart.belongsTo(User, { foreignKey: "userId",onDelete: "CASCADE" });
Cart.belongsToMany(Product, { foreignKey: "userId",through: "CartProducts" });

Wishlist.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE" });
Wishlist.belongsToMany(Product, { foreignKey: "userId",through: "WishlistProducts" });

Product.belongsToMany(Cart, { through: "CartProducts" });
Product.belongsToMany(Wishlist, {foreignKey: "userId", through: "WishlistProducts" });

// Hook to automatically create a Cart and a Wishlist after a User is created
User.afterCreate(async (user, options) => {
    await Cart.create({ UserId: user.id });
    await Wishlist.create({ UserId: user.id });
});


export { User, Product, Cart, Wishlist };
