import os
import string
import pymongo
import random

client = pymongo.MongoClient(os.environ['CHANGE_STREAM_DB'])
print(client.changestream.collection.insert_one({"hello": ''.join(random.choice(string.ascii_lowercase) for i in range(10))}).inserted_id)
