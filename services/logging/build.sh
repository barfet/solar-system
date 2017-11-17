#!/bin/bash

#build handlers
dotnet restore
dotnet publish -c release

echo 'Running unit tests...'
dotnet test test/Logging.Api.UnitTest/Logging.Api.UnitTest.csproj --no-build -c Release

echo 'Running integration tests...'
dotnet test test/Logging.Api.IntegrationTest/Logging.Api.IntegrationTest.csproj --no-build -c Release

#create deployment package
echo 'Creating deployment package...'
pushd ./src/Logging.Api/bin/Release/netcoreapp1.0/publish/
zip -r ./logging-api.zip ./*
popd