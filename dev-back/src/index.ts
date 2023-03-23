import express from 'express';
import cors from 'cors';

import { settings_router, coordinate_router } from './api/routes';

const app = express();
const PORT = 5135;

// *** middleware area *** //
app.use(cors());
app.use(express.json({ limit: 5000000 }));
app.use(settings_router, coordinate_router);

// *** server listening area *** //
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server Listening on port ${PORT}`);
});
