package routes

import (
	"letters-api/common"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func ConfigCORS(router *gin.Engine) {
	frontEndUrl := common.GetEnvironmentVariable("WEBSITE_URL")

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{frontEndUrl}, // Replace with your frontend's origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,           // Allow cookies or other credentials to be sent
		MaxAge:           12 * time.Hour, // How long to cache the preflight request
	}))
}
