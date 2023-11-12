#!/bin/bash

set -x

docker stop digits-container || true

docker rm digits-container || true

docker pull $docker_image

docker run -d --name digits-container -p 3000:3000 $docker_image