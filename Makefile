compose_up:
	docker-compose -f docker/docker-compose.yml up

build_and_run_docker:
	./scripts/docker/build_and_run_postgres.sh
	
build_services:
	docker compose -f docker/docker-compose.yml build

config_data_generator:
ifeq ($(shell docker ps -q -f name=data_generator),)
	@echo "data_generator is not running! You should first spin that up with 'make'"
else
	docker stop data_generator
	docker rm data_generator
endif
	docker compose -f docker/docker-compose.yml run --name data_generator -d data_generator $(freq)
