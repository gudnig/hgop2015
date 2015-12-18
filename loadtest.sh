#!/bin/bash
# runs capaicty tests on host after restarting docker container
#usage ./loadtest.sh host container
set -e -o pipefail
HOST="192.168.33.11"
CONTAINER="tictactoe"
if [ -n "$1" ]; then
  HOST="$1"
fi

HOST="192.168.33.11"
if [ -n "$2" ]; then
  CONTAINER="$2"
fi
echo restarting docker image
ssh vagrant@$HOST "docker restart $CONTAINER"
echo running capacity test
grunt mochaTest:load
