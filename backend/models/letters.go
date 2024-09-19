package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Letter struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey" json:"id"`
	Title     string    `gorm:"type:text" json:"title" binding:"required"`
	Content   string    `gorm:"type:text" json:"content" binding:"required"`
	UserId    uuid.UUID `gorm:"type:uuid" json:"userId"`
	User      User      `gorm:"foreignKey:UserId;references:ID" json:"user,omitempty"`
	CreatedAt time.Time `gorm:"type:timestamp with time zone;default:current_timestamp" json:"createdAt"`
	UpdatedAt time.Time `gorm:"type:timestamp with time zone;default:current_timestamp" json:"updatedAt"`
}

// Auto-generate UUID before creating a new letter record
func (u *Letter) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
