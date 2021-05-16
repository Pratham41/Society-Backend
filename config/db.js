import mysql from 'mysql';

const dbConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sms',
  multipleStatements: true,
});
// dbConnection.connect((err) => {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//   }

//   console.log('connected to the database');
// });

export default dbConnection;
