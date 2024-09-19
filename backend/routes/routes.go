package routes

import (
	"letters-api/routes/endpoints"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	endpoints.RegisterAuthRoutes(router)
	endpoints.RegisterLettersRoutes(router)
	endpoints.RegisterUsersRoutes(router)
}
