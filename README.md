Run mongo:4.2 in localhost:27017 (with a host shared volume)

```
docker run -d -p 27017:27017  -v /Volumes/data/docker/mongodb:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.2
```
