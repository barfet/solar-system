FROM microsoft/aspnetcore-build:2.0

WORKDIR /api

COPY . .

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["dotnet restore Planets.Api.sln && cd src/Planets.Api && dotnet run"]
