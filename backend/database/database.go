package database

import (
	"letters-api/common"
	"letters-api/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() {
	dsn := common.GetEnvironmentVariable("DATABASE_URL")

	var err error
	log.Println("dsn:", dsn)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	log.Println("Database connection established")
}

func Migrate() {
	DB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")

	err := DB.AutoMigrate(
		&models.Letter{},
		&models.MagicLink{},
		&models.User{},
	)

	if err != nil {
		log.Fatal("Failed to run migrations: ", err)
	}

	log.Println("Database migration completed")
}
