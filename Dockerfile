# Use the official .NET SDK as a build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./WebProjectNavigator.csproj" --disable-parallel
RUN dotnet publish "./WebProjectNavigator.csproj" -c release -o /app --no-restore

# Use the official .NET runtime as a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "WebProjectNavigator.dll"]
