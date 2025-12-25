import rootConfig from '../../eslint.config.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(...rootConfig, {
  files: ['**/*.{js,mjs,cjs,ts}'],
  // AI package specific rules or overrides here
});

