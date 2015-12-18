#!/bin/bash
echo Restarting docker image 'docker restart test'
ssh root@159.203.75.194
export ACCEPTANCE_URL=http://159.203.75.194:9000
grunt mochaTest:acceptance
