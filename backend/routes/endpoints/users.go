package endpoints

import (
	"letters-api/controllers"
	"letters-api/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterUsersRoutes(r *gin.Engine) {
	users := r.Group("/users")

	users.Use(middleware.JWTAuthMiddleware())

	{
		users.GET("/", controllers.GetUsers)
		users.POST("/", controllers.CreateUser)
		users.PUT("/:id", controllers.UpdateUser)
		users.DELETE("/:id", controllers.DeleteUser)
	}
}
