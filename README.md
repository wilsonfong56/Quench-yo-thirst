# Quench-yo-thirst

## How to run server
```
ionic serve
```

## Additional dependencies
To install angular cli
```
npm install -g @angular/cli
```
To install geolocation extention
```
npm install @capacitor/geolocation
npx cap sync
```
To install firebase extension
```
npm insatll firebase
ng add @angular/fire
```
[Firebase repo website](https://console.firebase.google.com/u/0/project/quench-yo-thirst-uci/overview)

To install healthkid extension
```
npm install cordova-plugin-health
npm install @awesome-cordova-plugins/health
ionic cap sync
```
To install command line input(CLI) extension for angular
```
ng add @angular/cli
```
Issues with Authorization Code Error:
Try the following before ng add command
```
firebase login:ci     # log in to an account
firebase login
```
