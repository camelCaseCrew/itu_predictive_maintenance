build_and_run_docker:
	./scripts/docker/build_and_run_postgres.sh

compose_up:
	docker-compose -f docker/docker-compose.yml up
	
build_services:
	docker compose -f docker/docker-compose.yml build
