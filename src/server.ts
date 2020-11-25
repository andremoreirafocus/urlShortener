import app from './app';
import database from './database';

// database.sync({force: true});  // force:true so em ambiente dev e força a criação da tabela
database.sync();  
console.log('Database running');

app.listen(3333);
console.log('Server running at port 3333')