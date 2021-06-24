
# React .Net 5.0 Calendar
Events calendar made with React, Redux Sagas, .Net 5.0

## How to run

You must perform the following steps to run the entire application

### Requirements

 - [x] Docker >= 20.10.5

### Steps

 1. Clone the project
 2. Navigate to the root folder of the project and excecute docker compose:

		cd Calendar
		docker-compose build
		docker-compose up


## How to use

Once the docker compose is running you can navigate to the following routes:

 -    [http://localhost:8081/](http://localhost:8081/) 
Where you will be able to access the database if you want to see all the data created / updated / deleted from the App

 - [http://localhost:5000/](http://localhost:5000/)
 Where you will be able to acces to the Calendar App

## Architecture - Backend

the architecture of the app was based on the [Onion Architecture](https://www.codeguru.com/csharp/csharp/cs_misc/designtechniques/understanding-onion-architecture.html#:~:text=Onion%20Architecture%20is%20based%20on,on%20the%20actual%20domain%20models.), implementing the API, Domain, DTOs, Repository, Services an Unit Tests layers.

I also covered basics of [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) and [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development).

![enter image description here](https://imgur.com/fd970eI.png)

## Architecture - FrontEnd

For the front end, Atomic Components concepts were used for the project structure and Styled Components for the stylesheets. For general styling, it was complemented with the Reacstrap library.

States were partially handled with Redux Sagas, connecting the middleware with a custom Http Request for backend communication.

![enter image description here](https://imgur.com/Xbqh9KF.png)

Typescript was implemented and several interfaces were created to strongly type the FrontEnd code.

## Git
For Git, the master, develop and features branches were used, maintaining a workflow based on GitFlow.

![enter image description here](https://imgur.com/68yvQ2P.png)

