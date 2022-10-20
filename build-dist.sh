mkdir ./dist/esm
cat >dist/esm/index.js <<!EOF
import cjsModule from '../index.js';
export const securityLoader = cjsModule.securityLoader;
export const httpClientHandler = cjsModule.httpClientHandler;
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module"
}
!EOF
