#!/bin/sh
mkdir -p /data/db
mongod --fork --dbpath /data/db --logpath /var/log/mongodb.log --bind_ip_all --port 27017
sleep 5
while ! nc -z localhost 27017; do
  echo "Waiting for MongoDB to start..."
  sleep 1
done
echo "MongoDB is ready"
npm start
