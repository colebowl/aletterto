package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	EmailAddress string    `gorm:"type:text" json:"emailAddress" binding:"required"`
	FirstName    string    `gorm:"type:text" json:"firstName" binding:"required"`
	LastName     string    `gorm:"type:text" json:"lastName" binding:"required"`
	CreatedAt    time.Time `gorm:"type:timestamp with time zone;default:current_timestamp" json:"createdAt"`
	UpdatedAt    time.Time `gorm:"type:timestamp with time zone;default:current_timestamp" json:"updatedAt"`
}

// Auto-generate UUID before creating a new user record
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
