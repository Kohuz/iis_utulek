#!/bin/sh

project_dir=$(realpath $(dirname $0))/..

zip_name=project.zip

backend_files="server/package.json server/package-lock.json server/source/*"
frontend_files="shelter/package.json shelter/package-lock.json shelter/src/* shelter/public/*"
docs_files="docs/doc.html docs/er.png docs/db.png"

zip $zip_name $backend_files $frontend_files $docs_files schema/*
