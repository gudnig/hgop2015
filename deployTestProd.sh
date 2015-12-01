#!/bin/bash

sudo service docker start

echo Pushing to docker

docker push gudnig/tictactoe

echo Connecting to prod

ssh vagrant@192.168.33.11 'bash -s' < resetdocker.sh
