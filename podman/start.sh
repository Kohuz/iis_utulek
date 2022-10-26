#!/bin/sh
if [ -z $(command -v podman) ]
then
    echo "error: consider aliasing docker to podman"
    exit 1
fi

podman run \
    --detach \
    --name=shelter-db \
    --publish 6603:3306 \
    shelter_db
