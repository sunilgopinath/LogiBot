import dotenv from 'dotenv';
import app from "./app";
import logger from './logger';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5000;
// Start server
const initServer = async () => {
    app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}

initServer();