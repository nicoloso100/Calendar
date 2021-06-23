#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y cron
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["Calendar/CalendarApp/CalendarApp.csproj", "Calendar/CalendarApp/"]
RUN dotnet restore "Calendar/CalendarApp/CalendarApp.csproj"
COPY . .
WORKDIR "/src/Calendar/CalendarApp"
RUN dotnet build "CalendarApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CalendarApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CalendarApp.dll"]