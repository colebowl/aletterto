package main

import (
	"letters-api/common"
	"letters-api/database"
	"letters-api/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	common.LoadEnvironmentVariables()

	database.Connect()
	database.Migrate()

	router := gin.Default()

	routes.ConfigCORS(router)
	routes.RegisterRoutes(router)

	router.Run(":8080")
}
