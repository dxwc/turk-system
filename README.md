https://turk-system.herokuapp.com/

Test Locally:
================
1. Go to application directory and run 'npm install'
2. Install Mongodb
3. Run mongod on a new terminal window
2. Then run 'npm start' on the old terminal window
3. Create superuser by using 'admin123' for superuser key in signup page

Error Fixes:
================
1. MongoDb Install fail:
	a. Data directory /data/db not found
	   Run sudo mkdir -p /data/db/
	   Run sudo chown `id -u` /data/db
	   
