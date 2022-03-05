import { Config } from '@jest/types'

export default <Config.InitialOptions> {
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/tests/(.+)': '<rootDir>/tests/$1',
    '^@/(.+)': '<rootDir>/src/$1'
  }
}
