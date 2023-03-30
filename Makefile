compose_up:
	docker compose -f docker/docker-compose.yml up -d

build_and_run_docker:
	./scripts/docker/build_and_run_postgres.sh
	
build_services:
	docker compose -f docker/docker-compose.yml build

compose_down:
	docker compose -f docker/docker-compose.yml down
	docker rm data_generator

.PHONY: config_data_simulation low_throughput_data_simulation medium_throughput_data_simulation high_throughput_data_simulation

config_data_simulation:
ifeq ($(shell docker ps -a -q -f name=data_generator),)
	@echo "data_generator is not created! You should first spin that up with 'make'"
else
	docker stop data_generator
	docker rm data_generator
	docker compose -f docker/docker-compose.yml run --name data_generator -d data_generator $(freq)
endif

low_throughput_data_simulation:
	$(MAKE) config_data_simulation freq=1

medium_throughput_data_simulation:
	$(MAKE) config_data_simulation freq=2

high_throughput_data_simulation:
	$(MAKE) config_data_simulation freq=3
