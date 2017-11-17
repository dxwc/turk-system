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

##2.2 Sign-in

The user can Sign-in by entering their email and password. If the user's email exists 
in the system, the system will verify the password. If not the system will ask the 
user to re-enter the email or create a new account. The user will be able to use the 
turk-system if the password is valid. If the password is not valid the user will be 
asked to re-enter their password. 

##2.2 Search Public Information

##2.3 Apply To Be a Client Or a Developer

##2.4 Add Profile Details

##2.5 View Application Status

##2.6 Discuss/Process Dev. Payment

##2.6 Hire a Biding Developer

##2.7 Add Money to the Total Deposit

##2.8 Post System Demand

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
