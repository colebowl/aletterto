# Makefile

# Default target
all: up

# Run docker compose up with --build and -d flags
up:
	docker compose up --build -d

.PHONY: all up