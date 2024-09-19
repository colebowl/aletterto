package endpoints

import (
	"letters-api/controllers"
	"letters-api/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterLettersRoutes(r *gin.Engine) {
	letters := r.Group("/letters")

	letters.Use(middleware.JWTAuthMiddleware())

	{
		letters.GET("/", controllers.GetLetters)
		letters.POST("/", controllers.CreateLetter)
		letters.GET("/:id", controllers.GetLetterById)
		letters.PUT("/:id", controllers.UpdateLetter)
		letters.DELETE("/:id", controllers.DeleteLetter)
		letters.GET("/:id/pdf", controllers.GenerateLetterPdf)
	}

}
