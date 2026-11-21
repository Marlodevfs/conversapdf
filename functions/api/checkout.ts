import { handleCheckout, type PolarEnv } from '../../lib/polar-core';

export const onRequestPost = ({ request, env }: { request: Request; env: PolarEnv }) => handleCheckout(request, env);
