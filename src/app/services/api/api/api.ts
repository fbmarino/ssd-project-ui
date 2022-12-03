export * from './auth.service';
import { AuthService } from './auth.service';
export * from './musics.service';
import { MusicsService } from './musics.service';
export const APIS = [AuthService, MusicsService];
