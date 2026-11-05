FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY *.csproj ./

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0

RUN apt-get update && apt-get install -y libkrb5-3

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "server.dll"]
# FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
# WORKDIR /src
# COPY . .
# RUN dotnet restore
# RUN dotnet publish -c Release -o /app/publish

# FROM mcr.microsoft.com/dotnet/aspnet:10.0
# WORKDIR /app
# COPY --from=build /app/publish .
# ENTRYPOINT ["dotnet", "server.dll"]