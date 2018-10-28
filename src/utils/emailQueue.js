import Bull from 'bull';

import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '../../config';

const redis = { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASSWORD };

const emailQueue = new Bull('email', { redis });

export default emailQueue;
