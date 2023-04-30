import { config } from 'dotenv';
import { Server } from './server';
config();

void new Server().start();
