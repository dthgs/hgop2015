#!/bin/bash

echo ----- PUSHING DOCKER IMAGE -----
docker push dthor/tictactoe

echo ----- DEPLOYING TO TEST SERVER -----
ssh root@159.203.75.194 "\
  docker pull dthor/tictactoe; \
  docker stop test; \
  docker rm test; \
  docker run -p 9100:8080 -d --name test -e \"NODE_ENV=production\" dthor/tictactoe;"
