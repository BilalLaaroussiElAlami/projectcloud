@echo off

setlocal EnableDelayedExpansion

REM Check if the file containing version exists, if not, create it with version 5
set "version_file=version.txt"
set "version=5"

if exist "%version_file%" (
    set /p version=<"%version_file%"
    set /a version+=1
)

REM Update the version in the file
echo !version!>"%version_file%"

REM Build the Docker image
docker build -t stoopid:v!version! .

REM Tag the Docker image
docker tag stoopid:v!version! bilallaaroussi/stoopid:v!version!

REM Push the Docker image to Docker Hub
docker push bilallaaroussi/stoopid:v!version!
