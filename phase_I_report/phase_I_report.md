---
companyname: CSC 32200
projectname: Turk System
forwhat: For Web Application
version: 0.1
bottomleft: Confidential
date: 13/OCT/17
documentidentifier: CSC322-EF2-0001
geometry: margin=3cm
---

#1. Introduction

##1.1 Purpose

The purpose of this document is to present detailed description of the Turk
system. It will explain the purpose and features of the system, the
interface of the system, what the system will do, the constraints under
which it must operate and how the system will react to external stimuli.
The document will also cover hardware, software and other technical
dependencies.

##1.2 Scope

The Turk system will be a bidding market place for business clients and
software developers. Business clients will post system requirements and
time to complete information - to which developers will bid.

Both clients and developers will have their profile page with relevant
information which would be public for everyone to access. The profile pages
will also contain their previous work history through the system including
ratings on them.

Payment processing is expected to be handled by third party or offline
through super user, who will also manage any disagreements over ratings or
payments among other things.

##1.3 Definitions, Acronyms, and Abbreviations


+ **Software Requirements Specification** : "A document that completely
  describes all of the functions of a proposed system and the constraints
  under which it must operate.  For example, this document."
+ **Database** : "Collection of all the information monitored by this
  system"
+ **Use Case Diagram** : A visual representation of relationship between
  users and their use-interaction with the system
+ **ES6** : A commonly used version of standard javascript language
+ **HTML5** : A commonly used standard version of HTML(hyper text markup
  language, used to structure web documents)
+ **Session Cookie** : A small set of temporary (until user closes browser)
  data sent to user's web browser that is commonly used to identify
  user/session/state

##1.4 References

Isatou Sanneh provided sample phase I report.

##1.5 Overview

The next chapter, the Overall Description section, of this document will give an overview of the functionality of the product. It describes the informal requirements and is used to establish a context for the technical requirements specification in the next chapter.
The third chapter, Specific Requirements, of this document describes in technical terms the details of the functionality of the product.
Both sections of the document describe the same software product.

#2. Overall Description

##2.1 Use-Case Model Survey

Use case diagram follows, use cases will be explained in more detailed in
later section.

![](./img/draw_io_UML.png)

The types of users are Super User, Client, Developer and visitor.

A brief summery of the users are:

+ Super User: Controls and handles various changes and exception.
+ Client: Posts requirements and pays developer
+ Developer: Work on client's requirement when chosen
+ Visitor: Non-registered user with limited access to view statistics and
  public information

##2.2 Assumptions and Dependencies

All actors must use compatible computer system with standard (unmodified)
GUI web browser such as Firefox, Google Chrome etc. with HTML5, ES6 and
session cookie support to connect to the system.

#3. Specific Requirements

##3.1 Use-Case Reports

### Use Case: Search public information such as client or developer histories
#### Brief Description

+ Visitor views Client or developer histories such as ratings and project
  details
+ Visitor views grand statistics such as number of clients, developers,
  client(s) with the most projects and developer(s) making most money,
  user account information such as resume, picture, interests, sample
  work/business credentials

#### Initial Step-By-Step Description

1. Visitor goes to the main page/view of the application
2. Visitor identifies:
    1. Search box
        1. Types and enters search term
        2. User views link to matched User/Project
        3. User follows desired link to view project/user histories and
           credentials such as resume, interrests, past ratings etc.
    2. Statistics section
        1. View top statistics
        2. Scroll or follow link to view further related information

### Use Case: Apply to be a client or a developer
#### Brief Description

+ Provide payment deposit (debit/credit card) information: via third
  party or offline, must be successful
+ Submit basic information such as role, location, username/userID etc.
  and a desired password
    + System will check to ensure username is unique to it's database

#### Initial Step-By-Step Description

1. Visitor follow register/login button/link present on most page views including
   main
2. Visitor submit payment information (email, debit/credit card number,
   confirmation number, expiration date, zip code)
3. Visitor fills out form containing role, username, password etc. fields
4. User submits the form

+ On payment submission error : display reason, abort registration
    + On blacklist error: abort, show reason
+ On User information submission error: refund and abort registration,
  show reason
    + On blacklist error: abort, show reason


### Use Case: Add profile details
#### Brief Description

+ Submit details including an about me, resume, profile photo, interests,
  business credentials or sample work.

#### Initial Step-By-Step Description

1. Visitor follow login button/link present on most page views including
   main
2. Visitor enters the username/userID and logs in to the temporary account.
3. Visitor fills the details about her/himself which includes a about me, resume
  upload, picture upload, interests, business credentials or sample work.
4. Visitor updates the entered information.

### Use Case: View application status
#### Brief Description

+ Vistor can view their current application status information.

#### Initial Step-By-Step Description

1. Visitor follow login button/link present on most page views including
   main
2. Visitor enters the username/userID and logs in to the temporary account.
3. Visitor views the application status on their login page.

[comment]: <> (Developer Use Cases)

### Use Case: Quit from the system
#### Brief Description

+ Visitor can choose to quit from the system by filing the quit demand to the super-user

#### Initial Step-By-Step Description

1. Visitor follow login button/link present on most page views including
main
2. Visitor files the quit demand
3. Visitor sends it to the super-user

### Use Case: Bid on any demand with promised timeline and money
#### Brief Description
#### Initial Step-By-Step Description

### Use Case: Submit delivered system
#### Brief Description
#### Initial Step-By-Step Description

### Use Case: Client Rate Developer
#### Brief Description

+ Client can rate the developer's work after he has received

#### Initial Step-By-Step Description

1. Client follows login button/link present on most page views including
main
2. Client is asked to rate the delivered product and sends the ratings to super-user
3. Super-user follows accordingly to the clients ratings if the ratings are good the developer
gets money else the super-user discuss with the client

### Use Case: Send complain message to the super-user
#### Brief Description

+ Visitor can send a complain message to the super-user

#### Initial Step-By-Step Description

1. Visitor follow login button/link present on most page views including
main
2. The visitor will write and send the complain to a super-user
3. Super-user will review the complain and decide on the punishment accordingly to the severity

### Use Case: View account closing status information
#### Brief Description

+ Visitor can see if their account has been closed

#### Initial Step-By-Step Description

1. Visitor follow login button/link present on most page views including
main
2. If the account was submitted to be canceled it will display account has been terminated

### Use Case: Bid on any demand with promised timeline and money
#### Brief Description

+ Developer bids on any demand posted by a client.

#### Initial Step-By-Step Description

1. Developer follows login button/link present on most page views including
   main
2. Developer searches list of demands
3. Developer finds demand that matches his desired timeline and money
4. Developer bids on chosen demand


##3.2 Supplementary Requirements

In order to ensure that the system can be long-term, safe, stable, reliable and efficient operation, the Turk system should meet the requirements below.

1. The accuracy and timeliness of the system processing
The accurate and timely treatment is necessary to the performance of the system. The system may be subject to current and future workload so this needs should be taken into consideration in the system design and development process. In addition the system capacity and response time needs to meet the demand of user information and request processing.
2. Open system and system scalability
The Turk system in the development process, should fully consider the future scalability. The system needs to adjust and expand functions to provide adequate usage. In order to get this, not only should the system be an open system but it also needs to meet certain specifications. Through the software of repair, replace the complete system upgrade and update.
3. Easy to use and easy to maintain system
Turk system is to directly face the user which might not be very familiar with computer. This requires the system to be able to provide friendly user interface and an easy to use interface. To achieve this, the system should try to use different languages for different regions of people. A use problem may arise, so need to have enough help online, and shorten the process of system user familiar.

#4. Supporting Information

This Software Requirements Specification includes:

• Table of Contents
