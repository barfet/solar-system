# solar-system# Solar System
Containerized application for displaying planets in Solar System.

## Overview

This project runs inside of Docker containers with Nginx proxy communication between them.
It encourage the microservice architecture, backend services are locaded in `services` folder and could be deployed and managed independently. Client applications is located in `apps` folder and could be also managed and deployed independently.

## Planets Service
Is a microservice for managing the planets information.
This service runs an ASP.NET Core Web API project that is using Amazon DynamoDB.

## Home application
Is an application for displaying planets info.
This application runs an Angular 4 project, with Redux pattern for UI data management and bundle using Webpack 2.

## Environment variables

This project depends on several environment variables, that is injecting by docker from `.env` file in project root.

|Environment Variable|Value for Local Development|Comments|
|---|---|---|
|`ASPNETCORE_ENVIRONMENT`|Development|This tells ASP.NET Core which environment the run-time is hosted in.|
|`AWS_ACCESS_KEY_ID`|(your_key)|AWS account key id.|
|`AWS_SECRET_ACCESS_KEY`|(your_secret_key)|AWS account secret key.|
|`AWS_REGION`|us-east-1|AWS region for deployment.|
|`PLANETS_TABLE_NAME`|solar-system-planets |DynamoDB table|
|`PLANETS_API_BASE_URL`|planets.solar.system|Planets Api URL|


## Installation
### Windows 10
* [Install Docker for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows)
* Enable drive sharing in Docker (Settings -> Shared Drives)
* Add project DNS names to the `C:\Windows\System32\drivers\etc\hosts` for Nginx proxying on localhost
`127.0.0.1 planets.solar.system home.solar.system`
* Disable IIS to relaease port `80` for Nginx
* cd to the project root `/solar-system` and execute in `CMD` `dc up` to run the whole infrastructure inside of Docker.
* Wait for the compilation to be completed and navigate to `home.solar.system` in favorite browser