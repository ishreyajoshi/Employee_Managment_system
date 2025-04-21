const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',     // change this if your DB host is different
  user: 'root',          // your MySQL username
  password: 'oracle',    // your MySQL password
  database: 'testdb'     // name of your database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID ' + db.threadId);
});

// Export the db connection for use in other files
module.exports = db;
