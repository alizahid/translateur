#!/bin/bash

cd android && ./gradlew assembleRelease
cp app/build/outputs/apk/app-release.apk ~/Desktop/translateur/translateur.apk
