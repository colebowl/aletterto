package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type MagicLink struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	UserID    uuid.UUID `gorm:"type:uuid;not null"`
	Token     string    `gorm:"type:varchar(256);uniqueIndex"`
	ExpiresAt time.Time `gorm:"not null"`
	Used      bool      `gorm:"default:false"`
	User      User      `gorm:"foreignKey:UserID"`
}

// Auto-generate UUID before creating a new user record
func (u *MagicLink) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
