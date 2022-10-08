import { app } from './express.js';
import { route } from './routes/message.routes.js';

app.use('/', route);

app.listen(3333, () => 'server running on port 3333');
