package services

import (
	"errors"
	"letters-api/database"
	"letters-api/models"

	"gorm.io/gorm"
)

type UserInput struct {
	EmailAddress string `json:"emailAddress" binding:"required"`
	FirstName    string `json:"firstName" binding:"required"`
	LastName     string `json:"lastName" binding:"required"`
}

func GetUserById(id string) (models.User, error) {
	var user models.User

	result := database.DB.First(&user, "id = ?", id)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return user, result.Error
	}

	return user, nil
}

func GetUserByEmailAddress(emailAddress string) (models.User, error) {
	var user models.User

	result := database.DB.First(&user, "email_address = ?", emailAddress)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return user, result.Error
	}

	return user, nil
}

// GetAllUsers retrieves all users from the database
func GetAllUsers() ([]models.User, error) {
	var users []models.User

	result := database.DB.Find(&users)

	if result.Error != nil {
		return nil, result.Error
	}

	return users, nil
}

// CreateUser creates a new user in the database
func CreateUser(input UserInput) (models.User, error) {
	user := models.User{
		FirstName:    input.FirstName,
		LastName:     input.LastName,
		EmailAddress: input.EmailAddress,
	}

	result := database.DB.Create(&user)

	if result.Error != nil {
		return models.User{}, result.Error
	}

	return user, nil
}

// UpdateUser updates an existing user
func UpdateUser(id string, input UserInput) (models.User, error) {
	var user models.User

	result := database.DB.First(&user, "id = ?", id)

	if result.Error != nil {
		return models.User{}, result.Error
	}

	database.DB.Save(&user)

	return user, nil
}

// DeleteUser deletes a user from the database
func DeleteUser(id string) error {
	var user models.User

	result := database.DB.Delete(&user, "id = ?", id)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
