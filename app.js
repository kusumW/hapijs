const { server } = require('./src/routes/web');

const init = async () => {
    await server.initialize();
    await server.start();
    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log('Error:', err);
    process.exit(1);
});

init();