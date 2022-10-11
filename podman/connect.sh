#!/bin/sh
if [ -z $(command -v mysql) ]
then
    echo "error: you do not have mysql client installed"
    exit 1
fi

mysql -uroot -ptest -h127.0.0.1 -P6603
