import Sequelize from 'sequelize';


// Connection to db credentials
const sequelize = new Sequelize(
  'alten_shop',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
  );

// check connection to db
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connexion à MySQL réussie avec Sequelize!');
    } catch (error) {
      console.error('Impossible de se connecter à la base de données :', error);
    }
  })();
  
  export default sequelize;