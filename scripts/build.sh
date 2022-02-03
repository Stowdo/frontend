#!/usr/bin/env bash

if [ ${PWD##*/} == scripts ] ;
then
    cd ..
fi

. scripts/utils.sh

set -a
. .env
set +a

echop 'Building react app...'
npm run build
echop 'Done'

echop 'Building image...'
docker build -t redbeandock/stowdo-frontend:"${REACT_APP_STOWDO_VERSION}" .
echop 'Done'

echop 'Pushing to Dockerhub...'
docker push redbeandock/stowdo-frontend:"${REACT_APP_STOWDO_VERSION}"
echop 'Done'