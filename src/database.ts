import {Sequelize} from 'sequelize'; 

const sequelize = new Sequelize('mysql://root:F0cusSUP172@localhost:3306/urlshortener');

export default sequelize;