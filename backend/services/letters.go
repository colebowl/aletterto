package services

import (
	"errors"
	"letters-api/common"
	"letters-api/database"
	"letters-api/models"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LetterInput struct {
	Title   *string   `json:"title"`
	Content *string   `json:"content"`
	UserId  uuid.UUID `json:"userId"`
}

type LetterListResponse struct {
	ID        uuid.UUID `json:"id"`
	Title     string    `json:"title"`
	UserId    uuid.UUID `json:"userId"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// GetAllLetters retrieves all letters from the database
func GetAllLetters(userId uuid.UUID) ([]LetterListResponse, error) {
	var letters []models.Letter

	// result := database.DB.Find(&letters, "user_id = ?", userId.String())
	result := database.DB.Select("id, title, user_id, created_at, updated_at").Find(&letters, "user_id = ?", userId.String()).Order("updated_at ASC")

	// Handle other possible errors
	if result.Error != nil {
		return nil, result.Error
	}

	var lettersList []LetterListResponse

	for _, letter := range letters {
		lettersList = append(lettersList, LetterListResponse{
			ID:        letter.ID,
			CreatedAt: letter.CreatedAt,
			Title:     letter.Title,
			UserId:    letter.UserId,
			UpdatedAt: letter.UpdatedAt,
		})
	}

	return lettersList, nil
}

// GetAllLetters retrieves all letters from the database
func GetLetterById(userId uuid.UUID, id string) (models.Letter, error) {
	var letter models.Letter

	result := database.DB.Preload("User").First(&letter, "id = ? AND user_id = ?", id, userId.String())

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return letter, result.Error
	}

	return letter, nil
}

// CreateLetter creates a new letter in the database
func CreateLetter(input LetterInput) (models.Letter, error) {
	letter := models.Letter{
		Title:   common.ValueWithFallback(input.Title, ""),
		Content: common.ValueWithFallback(input.Content, ""),
		UserId:  input.UserId,
	}

	result := database.DB.Create(&letter)

	if result.Error != nil {
		return models.Letter{}, result.Error
	}

	return letter, nil
}

// UpdateLetter updates an existing letter
func UpdateLetter(userId uuid.UUID, id string, input *LetterInput) (models.Letter, error) {
	// Step 1: Check if the record exists
	letter, err := GetLetterById(userId, id)

	if err != nil {
		return models.Letter{}, err
	}

	// Step 2: Update only the fields that are provided in the input
	if input.Title != nil {
		letter.Title = *input.Title
	}

	if input.Content != nil {
		letter.Content = *input.Content
	}

	// Update the 'UpdatedAt' timestamp
	letter.UpdatedAt = time.Now()

	// Step 3: Save the updated letter
	if err := database.DB.Select("title", "content", "updated_at").Save(&letter).Error; err != nil {
		return models.Letter{}, err
	}

	return letter, nil
}

// DeleteLetter deletes a letter from the database
func DeleteLetter(id string) error {
	var letter models.Letter

	result := database.DB.Delete(&letter, "id = ?", id)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
