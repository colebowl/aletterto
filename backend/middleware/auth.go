package middleware

import (
	"letters-api/auth"
	"letters-api/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

// JWTAuthMiddleware verifies the JWT token in the Authorization header
func JWTAuthMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		jwtToken := auth.ExtractJWTFromHeaders(context)
		log.Println("token:", jwtToken)

		if jwtToken == "" {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
			context.Abort()
			return
		}

		token, err := auth.ValidateJWT(jwtToken)

		if err != nil {

			context.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			context.Abort()
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			if userId, ok := claims["user_id"].(string); ok {
				context.Set("userId", userId)

				_, err := services.GetUserById(userId)

				if err != nil {
					context.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims: invalid user"})
					context.Abort()
				}
			}
		}

		context.Next()
	}
}
