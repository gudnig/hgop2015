#!/bin/bash
set -e -o pipefail
HOST="192.168.33.11"
if [ -n "$1" ]; then
  HOST="$1"
fi
echo restarting docker image
ssh vagrant@$HOST "docker restart yoserver"
echo running capacity test
grunt mochaTest:load
