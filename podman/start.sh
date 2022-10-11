#!/bin/sh
if [ -z $(command -v podman) ]
then
    echo "error: consider aliasing docker to podman"
    exit 1
fi

podman run \
    --detach \
    --name=utulek-db \
    --env="MYSQL_ROOT_PASSWORD=test" \
    --publish 6603:3306 \
    mysql
