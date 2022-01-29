#!/usr/bin/env bash

if [ ${PWD##*/} == scripts ] ;
then
    cd ..
fi

. scripts/utils.sh

echop 'Welcome to Stowdo frontend setup.'
echop 'This script will let you define variables for multiple environment.'
echop 'The proposals in brackets are the default values. Leave blank to use them.'

echo
read -p 'Local - API host (localhost): ' local_api_host
read -p 'Local - API port (8000): ' local_api_port
read -p 'Local - API protocol (http): ' local_api_protocol
read -p 'Production - API host (api.stowdo.tk): ' production_api_host
read -p 'Production - API port (80): ' production_api_port
read -p 'Production - API protocol (https): ' production_api_protocol
echo

if [ -z "$local_api_host" ]
then
    local_api_host=localhost
fi

if [ -z "$local_api_port" ]
then
    local_api_port=8000
fi

if [ -z "$local_api_protocol" ]
then
    local_api_protocol=http
fi

if [ -z "$production_api_host" ]
then
    production_api_host=api.stowdo.tk
fi

if [ -z "$production_api_port" ]
then
    production_api_port=80
fi

if [ -z "$production_api_protocol" ]
then
    production_api_protocol=https
fi

echo "REACT_APP_STOWDO_API_HOST='$local_api_host'" > env/local.env
echo "REACT_APP_STOWDO_API_PORT='$local_api_port'" >> env/local.env
echo "REACT_APP_STOWDO_API_PROTOCOL='$local_api_protocol'" >> env/local.env

echo "REACT_APP_STOWDO_API_HOST='$production_api_host'" > env/production.env
echo "REACT_APP_STOWDO_API_PORT='$production_api_port'" >> env/production.env
echo "REACT_APP_STOWDO_API_PROTOCOL='$production_api_protocol'" >> env/production.env

echop 'Environment variables have been defined!'