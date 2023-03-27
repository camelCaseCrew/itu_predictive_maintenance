compose_up:
	docker-compose -f docker/docker-compose.yml up

build_and_run_docker:
	./scripts/docker/build_and_run_postgres.sh
	
build_services:
	docker compose -f docker/docker-compose.yml build

rm_all_containers:
	docker rm $(docker ps -aq)

rm_all_images:
	docker rmi $(docker images -a)