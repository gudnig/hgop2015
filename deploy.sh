#!/bin/bash
#deploys docker image to host
#usage: ./deploy git-hash host port container
set -e -o pipefail

#default values
HOST="192.168.33.11"
PORT="8080"
CONTAINER="gudnig/tictactoe"
HASH=""


if [ -n "$1" ]; then
  HASH="$1"
else
  echo Must include git hash
  exit 1
fi
if [ -n "$2" ]; then
  HOST="$2"
fi
if [ -n "$3" ]; then
  PORT="$3"
fi
if [ -n "$4" ]; then
  CONTAINER="$4"
fi

echo Connecting to $HOST on port $PORT

ssh vagrant@$HOST 'bash -s' < resetdocker.sh $HASH $PORT $CONTAINER



