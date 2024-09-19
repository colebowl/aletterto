package common

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetUserIdFromContext get the userId of the authenticated user from context
func GetUserIdFromContext(context *gin.Context) uuid.UUID {
	var userId string = context.GetString("userId")

	parsedUserId, err := uuid.Parse(userId)

	if err != nil {
		var errorMessage string = "Invalid UUID string:"

		//TODO actually do something with this error
		log.Println(errorMessage, err)
	}

	return parsedUserId
}
