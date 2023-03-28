compose_up:
	docker compose -f docker/docker-compose.yml up

build_and_run_docker:
	./scripts/docker/build_and_run_postgres.sh
	
build_services:
	docker compose -f docker/docker-compose.yml build

compose_down:
	docker compose -f docker/docker-compose.yml down
	docker rm data_generator

config_data_simulation:
	ifeq ($(shell docker ps -q -f name=data_generator),)
		@echo "data_generator is not running! You should first spin that up with 'make'"
	else
		docker stop data_generator
		docker rm data_generator
	endif
		docker compose -f docker/docker-compose.yml run --name data_generator -d data_generator $(freq)

low_throughput_data_simulation:
	make config_data_simulation freq=1

medium_throughput_data_simulation:
	make config_data_simulation freq=2

high_throughput_data_simulation:
	make config_data_simulation freq=3