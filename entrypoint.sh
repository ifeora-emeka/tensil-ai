#!/bin/sh
mkdir -p /data/db
mongod --fork --dbpath /data/db --logpath /var/log/mongodb.log --bind_ip_all --port 27017 --noauth

echo "Waiting for MongoDB to start..."
sleep 5

while ! nc -z localhost 27017; do
  echo "Still waiting for MongoDB..."
  sleep 2
done

echo "MongoDB is ready"
exec npm start
