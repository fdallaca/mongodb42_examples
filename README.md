Run mongo:4.2 in localhost:27017 (with a host shared volume)

```
docker run -d -p 27017:27017  -v /Volumes/data/docker/mongodb:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.2

# run with (standalone) replication set
docker run -d -p 27017:27017  -v /Volumes/data/docker/mongodb:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:4.2 --replSet rs0 

# Only first time:
# docker exec <nome-container> mongo mongodb://mongoadmin:secret@127.0.0.1:27017/test?retryWrites=true\&authSource=admin --eval "rs.initiate(); rs.status()"

mongo mongodb://127.0.0.1:27017/ -u mongoadmin -p secret
# or
mongo mongodb://mongoadmin:secret@127.0.0.1:27017/test?retryWrites=true\&authSource=admin
```



Python programs:

```
# Create virtualenv
make

# Source virtualenv
source venv/bin/activate

# Initialize connection in ENV
# export CHANGE_STREAM_DB="mongodb+srv://user:<password>@example-xkfzv.mongodb.net/test?retryWrites=true&authSource=admin"
export CHANGE_STREAM_DB="mongodb://mongoadmin:secret@127.0.0.1:27017/test?retryWrites=true&authSource=admin"

# Follow this link for pipeline stages admitted
# https://docs.mongodb.com/manual/changeStreams/#modify-change-stream-output
```