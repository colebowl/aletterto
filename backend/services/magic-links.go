package services

import (
	"time"

	"letters-api/database"
	"letters-api/models"

	"github.com/google/uuid"
)

type MagicLinkInput struct {
	UserId    uuid.UUID
	TokenHash string
	ExpiresIn time.Duration
}

func CreateMagicLink(input *MagicLinkInput) (models.MagicLink, error) {
	magicLink := models.MagicLink{
		UserID:    input.UserId,
		Token:     input.TokenHash,
		ExpiresAt: time.Now().Add(input.ExpiresIn),
	}

	result := database.DB.Create(&magicLink)

	if result.Error != nil {
		return models.MagicLink{}, result.Error
	}

	return magicLink, nil
}

func GetMagicLinkByTokenHash(tokenHash string) (models.MagicLink, error) {
	var magicLink models.MagicLink

	result := database.DB.Where("token = ?", tokenHash).First(&magicLink)

	if result.Error != nil {
		return models.MagicLink{}, result.Error
	}

	return magicLink, nil

}

func UpdateMagicLink(input models.MagicLink) (models.MagicLink, error) {
	if err := database.DB.Save(&input).Error; err != nil {
		return models.MagicLink{}, err
	}

	return input, nil
}
