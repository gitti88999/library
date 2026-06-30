FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY *.csproj ./

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5217
# ENV DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER=1
RUN apt-get update && apt-get install -y ca-certificates curl
RUN update-ca-certificates
RUN apt-get install -y --reinstall ca-certificates
ENTRYPOINT ["dotnet", "server.dll"]
