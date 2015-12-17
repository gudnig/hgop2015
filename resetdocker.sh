#!/bin/bash
set -e - pipefail

docker kill yoserver
docker rm yoserver
docker pull gudnig/tictactoe
docker run -p 8080:8080 -d -e "NODE_ENV=production" --name yoserver gudnig/tictactoe
