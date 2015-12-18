#!/bin/bash
#pulls new version of container and runs it
#usage: ./resetdocker.sh version port container
set -e - pipefail

docker kill tictactoe
docker rm tictactoe
docker pull $3:$1
docker run -p $2:8080 -d -e "NODE_ENV=production" --name tictactoe $3:$1
