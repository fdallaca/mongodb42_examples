import os
import string
import pymongo
import random
import time

client = pymongo.MongoClient(os.environ['CHANGE_STREAM_DB'])
print(client.test.transactionColl01.insert_one({"hello": "Im first object"}).inserted_id)
print(client.test.transactionColl02.insert_one({"hello": "Im first object"}).inserted_id)

wc_majority = pymongo.write_concern.WriteConcern("majority", wtimeout=1000)
rc_local = pymongo.read_concern.ReadConcern("local")
rp_primary = pymongo.read_preferences.ReadPreference.PRIMARY

print("Start session..")
session = client.start_session()
print("Start transaction...")
transaction = session.start_transaction(
    read_concern=rc_local,
    write_concern=wc_majority,
    read_preference=rp_primary
)
print("insert_one")
print(client.test.transactionColl01.insert_one({"hello": ''.join(random.choice(string.ascii_lowercase) for i in range(10))},session=session).inserted_id)
print(client.test.transactionColl02.insert_one({"hello": ''.join(random.choice(string.ascii_lowercase) for i in range(10))},session=session).inserted_id)
time.sleep(60)
print("Commit transaction")
session.commit_transaction()


# with client.start_session() as session:
#     # Step 3: Use with_transaction to start a transaction, execute the callback, and commit (or abort on error).
#     session.with_transaction(
#         callback,
#         read_concern=ReadConcern("local"),
#         write_concern=wc_majority,
#         read_preference=ReadPreference.PRIMARY,
#     )
