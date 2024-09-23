DOCKER_COMPOSE_FILE := docker-compose.yml
DOCKER_COMPOSE_DIR := ./requirements
NAME := django
SHELL := /bin/bash
DB_PROMPT := psql -U admin -w transcendence
ENV_FILE := ./requirements/env

BACK_CONTAINER_NAME := django
FRONT_CONTAINER_NAME := frontend
DB_CONTAINER_NAME := postgres


.DEFAULT_GOAL := up

up down:
	docker compose \
	-f $(DOCKER_COMPOSE_DIR)/$(DOCKER_COMPOSE_FILE) \
	--env-file $(DOCKER_COMPOSE_DIR)/.env \
	$@

clean: down
	docker system prune -a

fclean: clean

back:
	docker exec -it $(BACK_CONTAINER_NAME) \
	$(SHELL)

front:
	docker exec -it $(FRONT_CONTAINER_NAME) \
	$(SHELL)

db:
	docker exec -it $(DB_CONTAINER_NAME) \
	$(SHELL)

psql:
	docker exec -it $(DB_CONTAINER_NAME) \
	$(DB_PROMPT)
	
re: fclean up

.PHONY: up down clean fclean back db psql re