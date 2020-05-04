import { Request } from 'express';
import type { TUsers } from '../db/models'

export type IPayLoad = {
    userid?: number;
    uniq?: string;
    tokenid?: number;
    role?: string;
}

export interface ReqUser extends Request {
    user: TUsers;
}