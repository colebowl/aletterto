package common

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnvironmentVariables loads the environment variables from a .env file.
func LoadEnvironmentVariables() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// IsLocalDevelopmentEnvironment checks if the current environment is set to "development".
func IsLocalDevelopmentEnvironment() bool {
	return GetEnvironmentVariable("ENVIRONMENT") == "development"
}

// GetEnvironmentVariable retrieves the value of the environment variable specified by the given key.
func GetEnvironmentVariable(key string) string {
	return os.Getenv(key)
}
