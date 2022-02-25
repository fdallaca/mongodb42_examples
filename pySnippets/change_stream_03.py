import os
import pymongo
from bson.json_util import dumps

client = pymongo.MongoClient(os.environ['CHANGE_STREAM_DB'])
change_stream = client.changestream.collection.watch()
for change in change_stream:
    print(dumps(change,indent=2))
    print('') # for readability only
    resumeToken = change_stream.resume_token
    print(dumps(resumeToken, indent=2))

# change_stream = client.changestream.collection.watch(resume_after=resumeToken)