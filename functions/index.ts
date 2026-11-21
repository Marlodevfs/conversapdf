import { handleRoot } from '../lib/polar-core';

export const onRequestGet = ({ request }: { request: Request }) => handleRoot(request);
