# echo "The first argument is: $1"

# if [ "$1" = "start" ]; then
#   echo "CMD: python manage.py runserver"
#   python manage.py runserver

# if [ "$1" = "make_migrate" ]; then
#   echo "CMD: python manage.py makemigrations"
#   python manage.py makemigrations

# if [ "$1" = "migrate" ]; then
#   echo "CMD: python manage.py migrate"
#   python manage.py migrate

# fi


#!/bin/bash

case "$1" in
  "start")
    echo "CMD: python manage.py runserver"
    python manage.py runserver
    ;;
  "make_migrations")
    echo "CMD: python manage.py makemigrations"
    python manage.py makemigrations
    ;;
  "migrate")
    echo "CMD: python manage.py migrate"
    python manage.py migrate
    ;;
  *)
    echo "Invalid argument"
    ;;
esac
