const DB_URL = process.env.NODE_ENV === 'production'
  ? { 'url': 'mongodb://testuser:dfk2432kAcSe1k12NVNWO3@ds121495.mlab.com:21495/turk-system' }
  : { 'url': 'mongodb://localhost/turk-system' };

module.exports = DB_URL;
