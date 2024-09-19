package endpoints

import (
	"letters-api/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(r *gin.Engine) {
	auth := r.Group("/auth")

	{
		auth.POST("/magic-link", controllers.ValidateMagicLink)
		auth.GET("/send-magic-link", controllers.SendMagicLink)
	}
}
