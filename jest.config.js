module.exports = {
    testIgnorePatterns: ['/node_modules/', '/.next/'],
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)": "<rootDir>/node_modules/babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom',
};