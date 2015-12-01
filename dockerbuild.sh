#!/bin/bash
set -e

sudo service docker start

echo Cleaning...
rm -rf ./dist

echo Building app
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t gudnig/tictactoe .

echo "Done"
