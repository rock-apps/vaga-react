import Knex from 'knex';

declare module 'knex/types/tables' {
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    tel?: string;
    avatar?: string;
    jwtVersion: number;
  }

  interface Tables {
    users: User;
  }
}
