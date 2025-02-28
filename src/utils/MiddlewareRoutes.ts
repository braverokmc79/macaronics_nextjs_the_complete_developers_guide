
// src/app/utils
export const LOGIN = '/auth/signin';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
    '/auth/signin',
    '/auth/signout',
    '/auth/error',
    '/auth/verify-request',
    '/auth/new-user',

    '/products',
    '/api/auth/callback/google',
    '/api/auth/callback/github',
    '/api/mongo/users/register',
    '/api/prisma/users/register',
    '/api/springboot/users/register',
    '/api/supabase/users/register',
]

export const PROTECTED_SUB_ROUTES = [
    '/checkout',
]

