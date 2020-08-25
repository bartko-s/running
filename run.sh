#!/usr/bin/env bash

PS3='Please select action: '
options=("development" "production" "production build" "connect to browser container" "connect to server container" "quit")
select opt in "${options[@]}"
do
    case $opt in
        "development")
            docker-compose -f ./docker-compose-production.yml -f ./docker-compose-development.yml up --build
            break
            ;;
        "production")
            docker-compose -f ./docker-compose-production.yml up --build
            break
            ;;
        "production build")
            docker-compose -f ./docker-compose-production.yml -f ./docker-compose-build.yml up --build
            break
            ;;
        "connect to browser container")
            docker-compose -f ./docker-compose-production.yml exec node-browser bash
            break
            ;;
        "connect to server container")
            docker-compose -f ./docker-compose-production.yml exec node-server bash
            break
            ;;
        "quit")
            break
            ;;
        *) echo "invalid action $REPLY";;
    esac
done
