package controllers

import (
	"letters-api/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetUsers handles GET requests for retrieving all users
func GetUsers(context *gin.Context) {
	users, err := services.GetAllUsers()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, users)
}

// CreateUser handles POST requests for creating a new user
func CreateUser(c *gin.Context) {
	var user services.UserInput

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newUser, err := services.CreateUser(user)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newUser)
}

// UpdateUser handles PUT requests for updating a user
func UpdateUser(c *gin.Context) {
	userID := c.Param("id")
	var user services.UserInput
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	updatedUser, err := services.UpdateUser(userID, user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, updatedUser)
}

// DeleteUser handles DELETE requests for deleting a user
func DeleteUser(c *gin.Context) {
	userID := c.Param("id")
	if err := services.DeleteUser(userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}
