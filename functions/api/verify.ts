import { handleVerify, type PolarEnv } from '../../lib/polar-core';

export const onRequestGet = ({ request, env }: { request: Request; env: PolarEnv }) => handleVerify(request, env);
