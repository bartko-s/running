#!/usr/bin/env bash

PS3='Please select action: '
options=("development" "production" "production build" "quit")
select opt in "${options[@]}"
do
    case $opt in
        "development")
            docker-compose -f ./docker-compose-production.yml -f ./docker-compose-development.yml build \
            && docker-compose -f ./docker-compose-production.yml -f ./docker-compose-development.yml up \
            && exit
            ;;
        "production")
            docker-compose -f ./docker-compose-production.yml build \
            && docker-compose -f ./docker-compose-production.yml up \
            && exit
            ;;
        "production build")
            docker-compose -f ./docker-compose-production.yml -f ./docker-compose-build.yml build \
            && docker-compose -f ./docker-compose-production.yml -f ./docker-compose-build.yml up \
            && exit
            ;;
        "quit")
            break
            ;;
        *) echo "invalid action $REPLY";;
    esac
done
