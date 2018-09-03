#!/bin/sh

echo "-------------- WHERE TO DEPLOY --------------"
INSTANCES=( live test )
for i in "${INSTANCES[@]}"
do
    echo ${i}
done

server_path="path is not defined"
target=
while [ -z ${target} ]
do
    echo -n 'Where you want to deploy app? '
    read target

    case ${target} in
    live)
        server_path="stefanbartko.sk/src/pace/public"
        ;;
#    test)
#        server_path="stefanbartko.sk/src/test-pace/public"
#        ;;
    *)
        echo "Sorry. Unknown $target target. Try again."
        target=
        ;;
  esac
done

ssh=
while [ -z ${ssh} ]
do
    echo -n 'SSH login-name@host?  '
    read ssh
done


ssh_port=
while [ -z ${ssh_port} ]
do
    echo -n 'SSH PORT?   '
    read ssh_port
done

echo "----------------- Your application will be deployed with this settings -----------------"
echo "Environment: $target "
echo "Server path: $server_path "
echo "SSH login    $ssh "
echo "SSH port:    $ssh_port "

while true; do
    read -p "ARE YOUR SURE? " YN
    case ${YN} in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# webpack production build
yarn run build

# deploy on server
rsync -azv --no-o --no-g --delete --delete-excluded --delete-after --progress -e "ssh -p $ssh_port" \
    --exclude "/static/js" \
    --exclude "/static/app.tsx" \
    --exclude "/static/css" \
    ./src/. \
    "$ssh":~/${server_path}/


# echo "-------------DEPLOYED ON ${target} ----------------"