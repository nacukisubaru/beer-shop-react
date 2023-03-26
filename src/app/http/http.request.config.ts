export let host = 'http://localhost:5000';
export let hostAdminPanel = 'http://localhost:1337';
export const limitPage = 10;
export const limitPageAdmin = 12;

if(process.env.NODE_ENV === 'production') {
    host = 'https://beer-grad.online';
}