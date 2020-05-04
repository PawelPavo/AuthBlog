import {Query} from '../';
import type {TTokens, DBResp} from '../models';
import { IPayLoad } from '../../utils/interfaces';

const insert = (token: IPayLoad) => {
    delete token.role;
    return Query<DBResp>('INSERT INTO tokens SET ?', token)
};

const update = (jwt: string, id: number) => Query<DBResp>('UPDATE tokens SET jwt =? WHERE id =?', [jwt, id])


export default{
    insert,
    update
};