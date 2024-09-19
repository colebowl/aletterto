package controllers

import (
	"letters-api/common"
	"letters-api/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetLetters handles GET requests for retrieving all letters
func GetLetters(context *gin.Context) {
	userId := common.GetUserIdFromContext(context)

	letters, err := services.GetAllLetters(userId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, letters)
}

func GetLetterById(context *gin.Context) {
	letterId := context.Param("id")
	userId := common.GetUserIdFromContext(context)

	letters, err := services.GetLetterById(userId, letterId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, letters)
}

// CreateLetter handles POST requests for creating a new letter
func CreateLetter(context *gin.Context) {
	var letter services.LetterInput

	letter.UserId = common.GetUserIdFromContext(context)

	if err := context.ShouldBindJSON(&letter); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newLetter, err := services.CreateLetter(letter)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusCreated, newLetter)
}

// UpdateLetter handles PUT requests for updating a letter
func UpdateLetter(context *gin.Context) {
	letterId := context.Param("id")
	userId := common.GetUserIdFromContext(context)

	var letter services.LetterInput

	if err := context.ShouldBindJSON(&letter); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedLetter, err := services.UpdateLetter(userId, letterId, &letter)

	if err == gorm.ErrRecordNotFound {
		context.JSON(http.StatusNotFound, gin.H{"error": "Letter not found"})
		return
	}

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, updatedLetter)
}

// DeleteLetter handles DELETE requests for deleting a letter
func DeleteLetter(context *gin.Context) {
	letterId := context.Param("id")
	if err := services.DeleteLetter(letterId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "Letter deleted"})
}

func GenerateLetterPdf(context *gin.Context) {
	letterId := context.Param("id")
	userId := common.GetUserIdFromContext(context)

	letter, err := services.GetLetterById(userId, letterId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	pdf, err := common.ConvertHTMLToPDF(letter.Content)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.Data(http.StatusOK, "application/pdf", pdf)
}
