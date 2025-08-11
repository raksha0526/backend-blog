// hashPassword.js
const bcrypt = require('bcrypt');

const password = process.argv[2] || 'example-password';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    process.exit(1);
  }
  console.log('Hashed password:', hash);
});
