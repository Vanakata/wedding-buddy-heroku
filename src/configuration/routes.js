const authRoutes = require('../routes/auth');
const weddingRouter = require('../routes/all-weddings');
const deleteWeddingRouter = require('../routes/delete-wedding');
const uploadRouter = require('../routes/upload');
const guestListRouter = require('../routes/guests');
const userWedding = require('../routes/user-wedding');

function initializeRoutes(app) {
    app.use('/auth', authRoutes);
    app.use('/weddings', weddingRouter,deleteWeddingRouter);
    app.use('/upload', uploadRouter);
    app.use('/guest-list', guestListRouter);
    app.use('/user', userWedding);
}

module.exports = initializeRoutes;