require('babel-register');

if (process.env.NODE_ENV === 'production') {
    console.log('prod server not implemented');
} else {
    require('./server.dev');
}
