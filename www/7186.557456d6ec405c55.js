"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7186],{7186:(l,s,i)=>{i.r(s),i.d(s,{Geolocation:()=>u,GeolocationWeb:()=>a});var t=i(5861),c=i(1053);class a extends c.Uw{getCurrentPosition(e){return(0,t.Z)(function*(){return new Promise((n,r)=>{navigator.geolocation.getCurrentPosition(o=>{n(o)},o=>{r(o)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))})})()}watchPosition(e,n){return(0,t.Z)(function*(){return`${navigator.geolocation.watchPosition(o=>{n(o)},o=>{n(null,o)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},e))}`})()}clearWatch(e){return(0,t.Z)(function*(){window.navigator.geolocation.clearWatch(parseInt(e.id,10))})()}checkPermissions(){var e=this;return(0,t.Z)(function*(){if(typeof navigator>"u"||!navigator.permissions)throw e.unavailable("Permissions API not available in this browser");const n=yield window.navigator.permissions.query({name:"geolocation"});return{location:n.state,coarseLocation:n.state}})()}requestPermissions(){var e=this;return(0,t.Z)(function*(){throw e.unimplemented("Not implemented on web.")})()}}const u=new a}}]);