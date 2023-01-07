#!/usr/bin/env bash

RED='\033[0;31m'
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
NC='\033[0m' # No Color

function buildDocker() {
    docker-compose build --build-arg DOCKER_HOST_USER_ID=${UID}
}

function startDocker {
    docker-compose down --remove-orphans && \
    docker-compose pull && \
    buildDocker && \
    docker-compose run --no-deps node yarn install && \
    docker-compose up
}

function stopDocker {
    docker-compose stop
}

function clearTemp {
    rm -rf .next
    rm -rf out
    echo -e "${GREEN}Temp folder was cleared ${NC} "
}

function connectToNode {
    docker-compose exec node bash
}

function buildApp {
    echo "------------------------------------------------------"
    echo "------------ Build START ----------------"
    echo "------------------------------------------------------"
    clearTemp
    docker-compose run --no-deps node yarn build
    docker-compose run --no-deps node yarn export
}

function lintCode {
    docker-compose run --no-deps node yarn lint
}

function showHelp {
    echo -e "
    OPTIONS
     - ${GREEN}dev-start${NC} or ${YELLOW}ds${NC} - Start development server
     - ${GREEN}dev-stop${NC} or ${YELLOW}dx${NC} - Stop development server
     - ${GREEN}clear-temp${NC} or ${YELLOW}ct${NC} - Clear cache
     - ${GREEN}build${NC} - Build front assets
     - ${GREEN}connect-to-node${NC} or ${YELLOW}cn${NC} - Connect to \"node\" docker container
     - ${GREEN}lint-code${NC} - Lint
     - ${GREEN}quit${NC} or ${YELLOW}q${NC} - Quit
  "
}

commandName=
userInput=$1
showHelp=$userInput
while [[ -z "$commandName" ]]; do
    if [[ -z "$showHelp" ]]; then
        showHelp
    fi

    if [[ -z "$userInput" ]]; then
        read -r commandName
        showHelp=
    else
        commandName="$userInput"
        userInput=
    fi

    case ${commandName} in
        "dev-start" | ds)
            startDocker
            exit
            ;;
        "build" | dsx)
            buildApp
            exit
            ;;
        "start" | s)
            stopDocker
            exit
            ;;
        "clear-temp" | ct)
            clearTemp
            exit
            ;;
        "connect-to-node" | cn)
            connectToNode
            exit
            ;;
        "lint-code")
            lintCode
            exit
            ;;
        "quit" | q)
            break
            ;;
        *)
            showHelp
            echo "Sorry. Unknown command \"$commandName\". Try again."
            commandName=
            showHelp='no'
            ;;
      esac
done
