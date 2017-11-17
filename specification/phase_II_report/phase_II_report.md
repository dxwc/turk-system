---
companyname: CSC 32200
projectname: Turk System
forwhat: For Web Application
version: 0.1
bottomleft: Confidential
date: 16/Nov/17
documentidentifier: CSC322-EF2-0001
geometry: margin=3cm
---

#1. Introduction

Introduction an overall picture of the system using collaboration class diagram

#2. Use Cases

The types of users are Super User, Client, Developer and visitor.

A brief summery of the users are:

+ **Super User**: Controls and handles various changes and exception.
+ **Client**: Posts requirements and pays developer
+ **Developer**: Works on client's requirement when chosen
+ **Visitor**: Non-registered (or temporarily registered) user with limited
  access to view statistics and public information

##2.1 Create an Account

The user-type Visitor will be able to create an account by entering their userid, name, 
deposit amount($), email, password. Users that want to apply to be a client can select
the user-type Client. Users that want to apply to be a developer can select the user-type
developer. Users that want to apply to be a super-user can select the user-type
super-user and enter the super-user key. Client and developer usertypes can add their
deposit amount. Once the user enters submit, the user's user id and email will be 
validated by the system to check the uniqueness of the user id and email. If the user id 
or email address of the user is not unique, the system will send an exception message
to the user stating the error. The user can then re-enter a new user id or email. The 
user will have to enter the password and the password-confirmation while creating an
account. If the password and password-confirmation does not match, the system will send
an exception message to the user stating the error. The user can then re-enter these 
two fields.

Precondition: User is connected to the internet

Normal Scenarios:

 1. User enters their userID, name, email, password, password confirmation and desired usertype.
 2. User's email and userID validation for uniqueness
 3. User's password and password confirmation for match
 4. User is redirected to the welcome GUI interface

Exception Scenarios:

 1. a. User does not enter a required field
 	a. 1. Display error message to user to enter all the required fields/information
 2. a. User's email and userID already exists in the database
    a. 1. Display error message stating email or userID is not unique
 3. b. User's password and password confirmation does not match
    b. 1. Display error message to user stating the password does not match the confirmatio

##2.2 Sign-in

The user can Sign-in by entering their email and password. If the user's email exists 
in the system, the system will verify the password. If not the system will ask the 
user to re-enter the email or create a new account. The user will be able to use the 
turk-system if the password is valid. If the password is not valid the user will be 
asked to re-enter their password. 

Precondition: User is connected to the internet

Normal Scenarios:

 1. User enters their email and password
 2. User's email address is validated against the database for match
 3. User's password is validated against the database for match
 4. User is redirected to the welcome GUI interface

Exception Scenarios:

 1. a. User does not enter a required field
 	a. 1. Display error message to user to enter all the required fields/information
 2. a. User's email address does not match
    a. 1. Display error message to user stating email is not found
 3. a. User's password does not match
    a. 1. Display error message to user stating password is does not match

##2.3 Search Public Information

Precondition: User is connected to the internet
			  User is logged in the system

Normal Scenarios:

 1. User visits the welcome GUI interface
 2. User types the search query in the search box and searches
 3. User's search query is validated
 4. System displays the matched result of the search query of links to Users or projects
 5. User follows desired links to view project/user histories and credentials
 6. User is redirected to the respective link's GUI interface

Exception Scenarios:

 2. a. User does not enter any information on the search query
    a. 1. Display error message to user to enter all the required fields/information
 3. a. No result matched with the database
    a. 1. Display error message stating no result found
    a. 2. Prompt user to re-enter the search query

##2.3 Apply To Be a Client Or a Developer

Normal Scenarios:

Exception Scenarios:

##2.4 Add Profile Details

Precondition: User is connected to the internet
			  User is logged in the system

Normal Scenarios:

 1. User views the welcome GUI interface and visits the profile
 2. User selects the Add more information
 3. User enters information about her/himself including resume, picture, interests
 4. Usertype - Developers add sample work
 5. Usertype - Clients add business credentials

Exception Scenarios:

 3. a. User does not enter a required information
    a. 1. Prompt error message to user asking for the required information
 4. a. Usertype - Developers does not enter any sample work
    a. 1. Prompt error message to user asking for the required information
 5. a. Usertype - Client does not enter any business credentials
    a. 1. Prompt error message to user asking for the required information

##2.5 View Application Status

Precondition: User is connected to the internet
			  User is logged in the system

Normal Scenarios:

 1. Usertype - Visitor views the main GUI interface
 2. User views the application status on the main page
 3. Add more details feature is disabled or enabled based on the application status

Exception Scenarios:

 2. a. No status available for that user
    a. 1. Prompt error message to user stating there is no status information available

##2.6 Discuss/Process Dev. Payment

##2.6 Hire a Biding Developer

Precondition: User is connected to the internet
			  User is logged in the system
			  Usertype is client

Normal Scenarios:

 1. Usertype - Client visits the main GUI interface
 2. Client selects view bidding developers option
 3. Redirect client to the list of all bidding developers for the system demand
 4. Client clicks on the bidding developer to hire
 5. Confirmation is sent and verified in the system
 6. Half of the bidding price is transferred from the client to the winner developer

Exception Scenarios:
 
 3. a. No bidding developers were found in the system
    a. 1.1. The posted deadline has passed
    a. 1.2. Redirect client to the project removed and $10 fees charged information page
    a. 2.1. The posted deadline has not passed
    a. 2.2. Prompt client with message that no bids placed for this system 
 4. a. Client clicked on the bidding developer of non-lowest price
    a. 1. Prompt a justification text-field for client requesting the reason

##2.7 Add Money to the Total Deposit

Precondition: User is connected to the internet
			  User is logged in the system
			  Usertype is client

Normal Scenarios:

 1. Usertype - Client visits the main GUI interface
 2. Client selects Add money to total deposit option
 3. Redirect client form with amount field
 4. Client clicks the confirm option
 5. Confirmation is sent and verified in the system

Exception Scenarios:
 
 3. a. Client did not enter any amount
    a. 1. Prompt error message to user asking for the required information
 4. a. Deadline for adding deposit has already passed
    a. 1. Prompt user that the deadline has already passed
    a. 2. Redirect client fees charged information page 

##2.8 Post System Demand

Precondition: User is connected to the internet
			  User is logged in the system
			  Usertype is client

Normal Scenarios:

 1. Usertype - Client visits the main GUI interface
 2. Client selects post a system demand option
 3. Client enters information including a paragraph describing system spec.
 4. Client enters information for bidding timeline 
 5. Client submits the system demand

Exception Scenarios:
 
 5. a. Client did not enter required information
    a. 1. Prompt error message to user asking for the required information

##2.9 Quit From the System


##2.10 Client Rate Developer

##2.11 Send Complain Message to the Super-User

##2.12 View Account Closing Status Information

##2.13 Bid on Any Demand With Promised Timeline and Money

##2.14 Submit Delivered System

##2.15 Rate Client

##2.16 Send Protesting Message To The Super-User

##2.17 View Account Closing Status Information

#3. E-R Diagram

E-R diagram goes here

#4. Detailed Design

##4.1 Super-User Methods:

##4.2 Client Methods:

##4.3 Developer Methods:

##4.4 Visitor Methods:

#5. System Screens

#6. Minutes of Group Meetings

#7. Phase I Report Feedback
