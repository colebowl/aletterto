package controllers

import (
	"letters-api/auth"
	"letters-api/common"
	"letters-api/services"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"gorm.io/gorm"
)

// SendMagicLink handles GET /auth/send-magic-link
func SendMagicLink(context *gin.Context) {
	emailAddress := context.Query("email")

	user, err := services.GetUserByEmailAddress(emailAddress)

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	auth.GenerateAndSendMagicLink(user)

	context.Status(201)
}

// ValidateMagicLink handles POST /auth/magic-link
func ValidateMagicLink(context *gin.Context) {
	// extract the JWT from the request headers
	jwtToken := auth.ExtractJWTFromHeaders(context)

	// Ensure the jwt is valid
	token, err := auth.ValidateJWT(jwtToken)

	if err == jwt.ErrTokenMalformed {
		context.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// Hash the token for lookup in the database
	tokenHash := common.HashStringValue(token.Raw)

	// Fetch existing token from the db based on it's hash
	magicLink, err := services.GetMagicLinkByTokenHash(tokenHash)

	// handle token not found case
	if err == gorm.ErrRecordNotFound {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	// handle token expired case
	if time.Now().After(magicLink.ExpiresAt) {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Token expired"})
		return
	}

	// handle token already used case
	if magicLink.Used {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Token already used"})
		return
	}

	// update the token in the db to mark it as used.
	// TODO Ideally you'd probably want some kind of clean up step
	magicLink.Used = true
	magicLink, err = services.UpdateMagicLink(magicLink)

	// handle update failed case
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// generate a JWT to use for authentication to provide to the user
	authToken, err := auth.GenerateJWT(magicLink.UserID.String(), nil)

	// handle generate JWT failed case
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// build the token response and return it
	context.JSON(http.StatusOK, map[string]interface{}{
		"authToken": authToken,
	})
}
