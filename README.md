# DistanceFinder

Simple sample app to determinate distance between two georereferenced points using Nominatim API and the Haversine formula.

## Index

- [Setup and run project](#setup-and-run-project)
- [About the solution](#about-the-solution)

## Setup and run project

Follow the following steps to run the app (you need to have locally installed yarn):

- yarn install && yarn start

## About the solution

In order to solve the requirement (calculate distance bewtween 2 given address), it was implemented a simple
create react app with Typecripts that implements a simple form throught react-hook-form library, asking for the
2 addresses. Once the form is submitted, it makes a request to Nominatim API to get the latitude and longitude.
If the request success, it calculate the distance using the lat and long, and the Haversine formula. It might be
some scenarios where the address is not the intended, since the API response was not accurate.
The summary result shows the real address that was considered for the calculation, so the user can decide if is correct or no.
If the request fails, it ask to the user to repeat the process
