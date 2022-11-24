#!/bin/sh
if [ -z $(command -v podman) ]
then
    echo "error: consider aliasing docker to podman"
    exit 1
fi

start_container() {
    local container_name=$1
    podman run \
        --detach \
        --network="host" \
        --name="$container_name" \
        "$container_name"
}

start_db_container() {
    local container_name=$1
    podman run \
        --detach \
        --name="$container_name" \
        --publish "6603:3306" \
        "$container_name"
}

start_db () {
    start_db_container shelter_db
}
start_frontend () {
    start_container shelter_frontend
}
start_backend() {
    start_container shelter_backend
}

case $1 in
    "db") start_db;;
    "frontend") start_frontend;;
    "backend") start_backend;;
    "all") start_db; start_frontend; start_backend;;
    *) echo "error: unknown container name" && exit 1;;
esac
