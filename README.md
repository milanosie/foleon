# Foleon Sr. Frontend Engineer Assignment - Milan Steenwinkel

## The assignment

Clients would like to have a dedicated page on their website to share/showcase all the
content they have produced with our platform. This type of content can be of any category,
for example: blog articles, case studies, brochures and ebooks.
This story is part of an epic, where we would like to allow our client to use an embeddable
page on their website, where they can display their created content which they built with our
tools.
The goal of this story is to create a “Proof of Concept” a page/application that showcases
display, filter and search functionalities for the created content.

Acceptance criteria
As a user, I want to be able to:
- Display a list of (my) publications.
- Filter the publications.
- Search the publications by name.
- Display a publication’s information.


## Key Architecture Decisions

For this application I have made several decisions based on the assumption that this is a real-world application that will be maintained and scaled over time. <br>
Using NX, Playwright and NgRX in a small demo application is overkill, but I wanted to showcase how I would approach a real-world application.

I have chosen Angular as that is the framework that I am most experienced with, which allows me to showcase the most of my skills in the shortest amount of time

Please refer to NOTES.md for more information on the architecture and design decisions.
### Tech Stack

- Nx - For additional project structure and (future) monorepo capabilities
- Angular - For the frontend application and quick out-of-the-box setup
- NgRx - For state management, as it is the most popular state management library for Angular and resembles Redux which is a popular state management library for React
- Playwright - For end-to-end testing, as it is a modern and fast end-to-end testing library that is easy to use and maintain
- Jest - For unit testing, as it is the most popular testing library, and also the one Foleon uses.
- TailwindCSS - For styling. I have chosen TailwindCSS as it is a utility-first CSS framework that is easy to use.


## Setup / Running the application

### Prerequisites

- Node 20.16.0
- NPM

### Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the application

### Running the tests

- Run `npm test` to run the unit tests
- Run `npm run e2e` to run the end-to-end tests
