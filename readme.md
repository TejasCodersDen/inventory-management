## COEN 280 - Database Systems Project
---
## Summary
This project is project is an assignment for COEN 280 course in Santa Clara University for 2023 winter quarter.

The project aims to create a database application for a computer service company. Some features for this projects are:
1. Mannage Customers
2. Mannage Service Contracts
3. Generate Bills
4. Generates Statistics for business insights

## Entity Relation Model
The first deliverable for this project are entity relation diagrams. The guides were to create this diagrams using two different notations.

### Crow's Foot Notation
![Crow's Foot Notation Diagram](/Documentation/Crow's_Notation.png "Crow's Foot Notation Diagram")
### Text Book Notation
![Text Book Notation Diagram](/Documentation/TextBook_Notation.png "Text Book Notation Diagram")

## To Run
###Configure your Database:
Connect to your Data base and run the following .sql File:

[Main.sql](SQL/Main.sql)

This will run all queries to generate the database objects:
1) Tables
2)Views
3)Procedures
4)Functions

## To Run
First Edit the /Backend/.env File these are the parameters to connect to your instance

### Install NodeJs

[Link to NodeJs](https://nodejs.org/en)

### Install Dependencies
run the following command from /Backend folder:
```
    npm install
```

### Run Project
Run the Project from the /Backend folder.
```
    node ./index
```