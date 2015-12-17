#!/bin/bash
set -e -o pipefail
echo restarting docker image
ssh vagrant@$1 "docker restart yoserver"
echo running capacity test
export ACCEPTANCE_URL=http://$1:$2
grunt mochaTest:load
