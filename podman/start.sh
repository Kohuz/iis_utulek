#!/bin/sh
if [ -z $(command -v podman) ]
then
    echo "error: consider aliasing docker to podman"
    exit 1
fi

start_container() {
    local ports=$1
    local container_name=$2
    podman run \
        --detach \
        --network="host" \
        --name="$container_name" \
        "$container_name"
}

start_db () {
    start_container "6603:3306" shelter_db
}
start_frontend () {
    start_container "80:3000" shelter_frontend
}
start_backend() {
    start_container "8585:80" shelter_backend
}

case $1 in
    "db") start_db;;
    "frontend") start_frontend;;
    "backend") start_backend;;
    "all") start_db; start_frontend; start_backend;;
    *) echo "error: unknown container name" && exit 1;;
esac
