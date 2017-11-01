all:
	bash -c "clear"
	@echo "This should run from seperate terminal and have it kept running"
	bash -c "sleep 3"
	bash -c "mkdir -p ./db_data"
	@echo "Attempting to start mongoDB database server to listen on port 27017 at ./db_data"
	sudo mongod --port 27017 --dbpath ./db_data
start:
	bash -c "clear"
	@echo "This should run from seperate terminal and have it kept running"
	bash -c "sleep 3"
	bash -c "mkdir -p ./db_data"
	@echo "Attempting to start mongoDB database server to listen on port 27017 at ./db_data"
	sudo mongod --port 27017 --dbpath ./db_data
stop:
	@echo "Turning off mongoDB server listening on port 27017 at ./db_data"
	sudo mongod --port 27017 --dbpath ./db_data --shutdown
