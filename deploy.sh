#!/bin/bash
set -e -o pipefail

HOST="192.168.33.11"

sudo service docker start

echo Pushing to docker

docker push gudnig/tictactoe

if [ -n "$2" ]; then
  HOST="$2"
fi

echo Connecting to $HOST

ssh vagrant@$HOST 'bash -s' < resetdocker.sh

if [ "$1" = "test" ]; then
  echo Running acceptance tests
  ssh vagrant@$HOST "docker restart yoserver"
  grunt mochaTest:acceptance
fi


