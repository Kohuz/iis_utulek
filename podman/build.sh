#!/bin/bash
podman_dir=$(realpath $(dirname $0))
cd "$podman_dir/../schema"
podman build -f ../podman/Containerfile -t shelter_db .
