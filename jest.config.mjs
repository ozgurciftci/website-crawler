import tsconfig from './tsconfig.json' assert { type: 'json' };
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, { prefix: '<rootDir>/', useESM: true }),
        // "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transformIgnorePatterns: [
        "node_modules/(?!.*\\.m?[tj]sx?$)"
    ],
};
