package auth

import (
	"crypto/sha256"
	"fmt"
	"letters-api/common"
	"letters-api/models"
	"letters-api/services"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// GenerateAndSendMagicLink a _very_ rudimentary one time password (OTP) implementation meant only as a proof of concept. This
// should absolutely not be taken as suggestion of the correct way to implement OTP.
func GenerateAndSendMagicLink(user models.User) {
	token, err := GenerateJWT(user.ID.String(), &jwt.MapClaims{"usage": "magic-link"})

	if err != nil {
		log.Println("Failed to generate JWT Token", err)
		return
	}

	// Hash the token for storage in the database
	tokenHash := fmt.Sprintf("%x", sha256.Sum256([]byte(token)))

	// insert it into the database
	services.CreateMagicLink(&services.MagicLinkInput{UserId: user.ID, TokenHash: tokenHash, ExpiresIn: time.Hour})

	var basePath = common.GetEnvironmentVariable("WEBSITE_URL")
	var magicLinkUrl string = basePath + "/auth/magic-link?token=" + token

	if common.IsLocalDevelopmentEnvironment() {
		log.Println("-------------------------------------------------------------")
		log.Println("Magic auth link:")
		log.Println(magicLinkUrl)
		log.Println("-------------------------------------------------------------")
	}

	// TODO: one day actually implement the ability to send the magic link to the user
	//sendMagicLinkToUser(user.Email, token)
}
