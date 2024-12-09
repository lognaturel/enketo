import chaiFriendly from 'eslint-plugin-chai-friendly';
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import parser from 'markdown-eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            '**/.nyc*',
            '**/node_modules/**/*',
            '**/docs/**/*',
            '**/test-coverage/**/*',
            '**/coverage.shield.badge.md',
            'examples/*/dist/*',
            'packages/enketo-transformer/dist/*',
            'packages/enketo-transformer/src/xsl/*',
            'packages/enketo-transformer/test/**/*.xml',
            'packages/enketo-core/build/*',
            'packages/enketo-core/**/jquery.relevant-dropdown.js',
            'packages/enketo-core/test/mock/forms.js',
            'packages/enketo-express/public/js/build/*',
            'packages/enketo-express/**/offline-app-worker-partial.js',
        ],
    },
    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'prettier'
    ),
    {
        plugins: {
            'chai-friendly': chaiFriendly,
            jsdoc,
            prettier,
            unicorn,
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...Object.fromEntries(
                    Object.entries(globals.browser).map(([key]) => [key, 'off'])
                ),
                ...Object.fromEntries(
                    Object.entries(globals.commonjs).map(([key]) => [
                        key,
                        'off',
                    ])
                ),
                ...Object.fromEntries(
                    Object.entries(globals.node).map(([key]) => [key, 'off'])
                ),
                Promise: true,
                sinon: true,
            },

            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: 'module',
        },

        settings: {
            'import/extensions': [
                '.cjs',
                '.cts',
                '.js',
                '.jsx',
                '.mjs',
                '.mts',
                '.ts',
                '.tsx',
            ],

            'import/parsers': {
                '@typescript-eslint/parser': [
                    '.cjs',
                    '.cts',
                    '.js',
                    '.jsx',
                    '.mjs',
                    '.mts',
                    '.ts',
                    '.tsx',
                ],
            },

            'import/resolver': {
                node: {
                    extensions: [
                        '.cjs',
                        '.cts',
                        '.js',
                        '.jsx',
                        '.mjs',
                        '.mts',
                        '.ts',
                        '.tsx',
                    ],
                },

                typescript: {
                    alwaysTryTypes: true,
                },
            },

            jsdoc: {
                tagNamePreference: {
                    returns: 'return',
                },
            },
        },

        rules: {
            'prettier/prettier': 'error',
            'import/extensions': 'warn',
            'import/order': 'warn',
            'import/prefer-default-export': 'off',
            'no-unused-expressions': 'off',
            'chai-friendly/no-unused-expressions': 'error',

            'class-methods-use-this': [
                'error',
                { enforceForClassFields: false },
            ],

            'eol-last': ['error', 'always'],
            'no-restricted-syntax': [
                'warn',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement',
            ],
            '@typescript-eslint/no-this-alias': 'warn',
            '@typescript-eslint/no-var-requires': 'warn',
            'no-loss-of-precision': 'off',
            '@typescript-eslint/no-loss-of-precision': 'error',
            'no-useless-constructor': 'off',
            '@typescript-eslint/no-useless-constructor': 'error',
            'no-unused-vars': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            'no-dupe-class-members': 'off',
            '@typescript-eslint/no-dupe-class-members': 'error',
            'no-empty-function': 'off',
            '@typescript-eslint/no-empty-function': 'error',
            'no-redeclare': 'off',
            '@typescript-eslint/no-redeclare': 'error',
        },
    },
    {
        files: [
            'packages/*/.github/**/*.md',
            'packages/*.md',
            'packages/**/*.md',
            'packages/*/tutorials/**/*.md',
        ],

        languageOptions: {
            parser: parser,
        },

        rules: {
            'prettier/prettier': [
                'error',
                {
                    parser: 'markdown',
                },
            ],
        },
    },
    {
        files: ['**/*.d.ts'],

        rules: {
            'import/no-extraneous-dependencies': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],

        rules: {
            '@typescript-eslint/no-non-null-assertion': 'error',
            'consistent-return': 'off',
            'no-undef': 'off',
        },
    },
    {
        files: ['**/*.d.ts'],

        rules: {
            'lines-between-class-members': 'off',
        },
    },
    {
        files: ['packages/openrosa-xpath-evaluator/**/*'],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
            },
        },

        rules: {
            'class-methods-use-this': 'warn',
            'consistent-return': 'warn',
            'no-continue': 'warn',
            'no-param-reassign': 'warn',
            'no-plusplus': 'warn',
            'no-shadow': 'warn',
            'no-underscore-dangle': 'warn',

            'no-use-before-define': [
                'warn',
                {
                    functions: false,
                },
            ],
        },
    },
    {
        files: [
            'examples/enketo-transformer-web/**/*',
            'packages/enketo-*/**/*',
        ],

        rules: {
            'no-param-reassign': 'warn',
            'no-shadow': 'warn',
            'no-underscore-dangle': 'warn',

            'no-use-before-define': [
                'warn',
                {
                    functions: false,
                },
            ],

            'prefer-destructuring': 'warn',
        },
    },
    {
        files: [
            'examples/enketo-transformer-web/**/*',
            'packages/enketo-transformer/**/*',
            'packages/enketo-core/**/*',
        ],

        rules: {
            'guard-for-in': 'warn',
        },
    },
    {
        files: ['packages/enketo-core/**/*', 'packages/enketo-express/**/*'],

        rules: {
            'import/no-unresolved': [
                'error',
                {
                    ignore: [
                        'enketo/config',
                        'enketo/widgets',
                        'enketo/translator',
                        'enketo/dialog',
                        'enketo/file-manager',
                        'enketo/xpath-evaluator-binding',
                    ],
                },
            ],

            'consistent-return': 'warn',
            'global-require': 'warn',
            'no-cond-assign': 'warn',
            'no-nested-ternary': 'warn',
            'no-plusplus': 'warn',
            'no-return-assign': 'warn',
            'prefer-const': 'warn',
            'prefer-promise-reject-errors': 'warn',
        },
    },
    {
        files: ['packages/enketo-transformer/**/*.ts'],

        rules: {
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    '': 'never',
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                },
            ],
        },
    },
    {
        files: ['packages/enketo-transformer/**/*'],

        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: 'packages/enketo-transformer/tsconfig.json',
                },
            },
        },
    },
    {
        files: ['packages/enketo-core/**/*'],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...Object.fromEntries(
                    Object.entries(globals.node).map(([key]) => [key, 'off'])
                ),
                ...Object.fromEntries(
                    Object.entries(globals.commonjs).map(([key]) => [
                        key,
                        'off',
                    ])
                ),
            },
        },

        rules: {
            'class-methods-use-this': 'warn',
            'default-case': 'warn',
            'no-constructor-return': 'warn',
            'no-continue': 'warn',
            'no-loop-func': 'warn',
            'no-new': 'warn',
            'no-restricted-globals': ['warn', 'isFinite', 'isNaN'],
            'no-throw-literal': 'warn',
            'no-useless-concat': 'warn',
        },
    },
    {
        files: ['packages/enketo-express/**/*'],

        rules: {
            'array-callback-return': 'warn',
            'no-promise-executor-return': 'warn',
            'no-restricted-globals': 'warn',
            'import/no-dynamic-require': 'warn',
        },
    },
    {
        files: ['examples/**/*'],

        rules: {
            'import/no-relative-packages': 'warn',
        },
    },
    {
        files: ['examples/enketo-transformer-web/**/*'],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...Object.fromEntries(
                    Object.entries(globals.node).map(([key]) => [key, 'off'])
                ),
            },
        },

        rules: {
            'react/destructuring-assignment': 'off',

            'react/jsx-filename-extension': [
                'error',
                {
                    extensions: ['.jsx', '.tsx'],
                },
            ],

            'react/no-unknown-property': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        files: ['tools/**/*.js', '**/Gruntfile.js', '**/karma.conf.js'],

        languageOptions: {
            globals: {
                ...Object.fromEntries(
                    Object.entries(globals.browser).map(([key]) => [key, 'off'])
                ),
                ...globals.commonjs,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.spec.*'],

        rules: {
            'no-console': 'off',
            'no-unused-expressions': 'off',
            'chai-friendly/no-unused-expressions': 'warn',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-this-alias': 'off',
        },
    },
];
