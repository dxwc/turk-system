# DB setup

    sudo -u postgres createuser --interactive
    Enter name of role to add: turk_admin
    Shall the new role be a superuser? (y/n) y

    sudo -u postgres psql
    ALTER USER turk_admin WITH PASSWORD 'abc123';
    CREATE DATABASE turk_system OWNER turk_admin;

File piping example:

    sudo psql -U turk_admin -d turk_system < create_tables.sql
