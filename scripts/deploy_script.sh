#!/bin/bash

set -x

docker stop digits-container || true

docker rm digits-container || true

docker rmi digits:latest

docker pull digits:latest

docker run -d --name digits-container -p 3000:3000 digits:latest