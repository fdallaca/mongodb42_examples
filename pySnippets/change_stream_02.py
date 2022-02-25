import os
import pymongo
from bson.json_util import dumps

client = pymongo.MongoClient(os.environ['CHANGE_STREAM_DB'])
change_stream = client.changestream.collection.watch([
    {
        '$match': {
            'operationType': { '$in': ['update'] }
        }
    },
    {
        '$addFields': {
            'newField': 'New value!'
        }
    }
])
for change in change_stream:
    print(dumps(change,indent=2))
    print('') # for readability only