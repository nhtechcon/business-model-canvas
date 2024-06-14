export * from './api-auth.service';
import { ApiAuthService } from './api-auth.service';
export * from './api-auth.serviceInterface';
export * from './user.service';
import { UserService } from './user.service';
export * from './user.serviceInterface';
export const APIS = [ApiAuthService, UserService];
