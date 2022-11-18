#!/bin/bash
podman_dir=$(realpath $(dirname $0))
cd "$podman_dir/../schema"
podman build -f ../podman/database/Containerfile -t shelter_db .
printf "\n"

cd "$podman_dir/.."
podman build -f podman/frontend/Containerfile -t shelter_frontend .
printf "\n"

podman build -f podman/backend/Containerfile -t shelter_backend .
