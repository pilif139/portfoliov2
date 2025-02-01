import nextJest from "next/jest"
import type { Config } from "jest"

const createJestConfig = nextJest({
    dir: "./",
})

const jestConfig: Config = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jsdom",
}

export default createJestConfig(jestConfig)
