import { join } from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.DB_NAME ?? 'development';
// Server config
export const SERVER_PORT = process.env.PORT || 3000;
export const SERVER_HOST = '0.0.0.0';
// DB config
export const DB_HOST = process.env.DB_HOST ?? 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT ?? '3306', 10);
export const DB_USER = process.env.DB_USER ?? 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
export const DB_NAME = process.env.DB_NAME ?? 'url_shortener';
// Path
export const CLIENT_STATIC_DIR = join(__dirname, '..', 'static');
export const STATIC_ASSETS_PATH = join(CLIENT_STATIC_DIR, 'assets/');
export const INDEX_HTML_PATH = join(CLIENT_STATIC_DIR, 'index.html');
