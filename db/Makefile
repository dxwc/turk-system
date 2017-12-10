all:
	sudo psql -U turk_admin -d turk_system < tables.sql
	sudo psql -U turk_admin -d turk_system < add_new_user.sql
	sudo psql -U turk_admin -d turk_system < accept_reject.sql
	sudo psql -U turk_admin -d turk_system < is_in_blacklist.sql
	sudo psql -U turk_admin -d turk_system < setup_regular_user.sql
	sudo psql -U turk_admin -d turk_system < user_transaction.sql
	sudo psql -U turk_admin -d turk_system < add_system_demand.sql
