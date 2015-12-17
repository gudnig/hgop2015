#!/bin/bash
set -e -o pipefail

export ACCEPTANCE_URL=http://192.168.33.11:8080
grunt mochaTest:load
