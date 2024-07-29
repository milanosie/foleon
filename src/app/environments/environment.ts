import {Environment} from "./environment.interface";

export const environment: Environment = {
    production: false,
    apiBaseUrl: 'https://api.foleon.com',
    Client_ID: 'eVOfzXYAzz',
    Client_Secret: 'f467185f0e8ed5c8125929c1d5fbedc15bd9f60b413f7d8629fad65b3ffa7ad5' // NOTE: In a real world scenario I would not store this in the client side, but go through a backend to keep this information secure.
}
