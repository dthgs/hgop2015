#!/bin/bash
echo Restarting docker image 'docker restart test'
ssh root@159.203.75.194
export ACCEPTANCE_URL=http://localhost:9000
grunt mochaTest:load
