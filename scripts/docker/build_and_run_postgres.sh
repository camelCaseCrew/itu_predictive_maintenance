#!/bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

cd ../..

ver=0.1
container="postgresdb"

docker stop postgresdb || true && docker rm postgresdb || true

tag="${container}.${ver}"

# Cleanup older container image from docker
docker image rm $tag -f

echo "Building docker image $tag"
docker build -f docker/database/Dockerfile -t $tag .

echo "Running docker image $tag"
docker run -d -p 5432:5432 --name $container\
    $tag