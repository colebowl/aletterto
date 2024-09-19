package auth

import (
	"letters-api/common"
	"log"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

// ExtractJWTFromHeaders extracts the JWT token from the Authorization header
func ExtractJWTFromHeaders(context *gin.Context) string {
	authHeader := context.GetHeader("Authorization")

	if authHeader == "" {
		return ""
	}

	return strings.TrimPrefix(authHeader, "Bearer ")
}

// GenerateJWT generates a new JWT token for the authenticated user
func GenerateJWT(userId string, claims *jwt.MapClaims) (string, error) {
	jwtSecretEnvVar := common.GetEnvironmentVariable("JWT_SECRET")

	if jwtSecretEnvVar == "" {
		log.Fatal("JWT_SECRET environment variable is missing")
	}

	jwtSecret := []byte(jwtSecretEnvVar)

	jwtClaims := jwt.MapClaims{}

	// If additional claims are provided, merge them into jwtClaims
	if claims != nil {
		for key, value := range *claims {
			jwtClaims[key] = value
		}
	}

	jwtClaims["user_id"] = userId
	jwtClaims["exp"] = time.Now().Add(24 * time.Hour).Unix()

	// Create a new JWT token with the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwtClaims)

	// return token signed with the secret key
	return token.SignedString(jwtSecret)
}

func ValidateJWT(tokenString string) (*jwt.Token, error) {
	jwtSecretEnvVar := common.GetEnvironmentVariable("JWT_SECRET")

	if jwtSecretEnvVar == "" {
		log.Fatal("JWT_SECRET environment variable is missing")
	}

	jwtSecret := []byte(jwtSecretEnvVar)

	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Check the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return jwtSecret, nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}
