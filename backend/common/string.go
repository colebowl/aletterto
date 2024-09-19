package common

import (
	"crypto/sha256"
	"fmt"
)

// ValueWithFallbackHelper a helper function to return a default value if the string is nil
func ValueWithFallback(s *string, defaultValue string) string {
	if s == nil {
		return defaultValue
	}
	return *s
}

// HashStringValue returns the hashed value of a string
func HashStringValue(stringValue string) string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(stringValue)))
}
