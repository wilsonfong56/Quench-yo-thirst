'use strict';

var tslib = require('tslib');
var i0 = require('@angular/core');
var core = require('@awesome-cordova-plugins/core');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var i0__namespace = /*#__PURE__*/_interopNamespaceDefault(i0);

var HealthKit = /** @class */ (function (_super) {
    tslib.__extends(HealthKit, _super);
    function HealthKit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HealthKit.prototype.available = function () { return core.cordova(this, "available", {}, arguments); };
    HealthKit.prototype.checkAuthStatus = function (options) { return core.cordova(this, "checkAuthStatus", {}, arguments); };
    HealthKit.prototype.requestAuthorization = function (options) { return core.cordova(this, "requestAuthorization", {}, arguments); };
    HealthKit.prototype.readDateOfBirth = function () { return core.cordova(this, "readDateOfBirth", {}, arguments); };
    HealthKit.prototype.readGender = function () { return core.cordova(this, "readGender", {}, arguments); };
    HealthKit.prototype.readBloodType = function () { return core.cordova(this, "readBloodType", {}, arguments); };
    HealthKit.prototype.readFitzpatrickSkinType = function () { return core.cordova(this, "readFitzpatrickSkinType", {}, arguments); };
    HealthKit.prototype.saveWeight = function (options) { return core.cordova(this, "saveWeight", {}, arguments); };
    HealthKit.prototype.readWeight = function (options) { return core.cordova(this, "readWeight", {}, arguments); };
    HealthKit.prototype.saveHeight = function (options) { return core.cordova(this, "saveHeight", {}, arguments); };
    HealthKit.prototype.readHeight = function (options) { return core.cordova(this, "readHeight", {}, arguments); };
    HealthKit.prototype.findWorkouts = function () { return core.cordova(this, "findWorkouts", {}, arguments); };
    HealthKit.prototype.saveWorkout = function (options) { return core.cordova(this, "saveWorkout", {}, arguments); };
    HealthKit.prototype.querySampleType = function (options) { return core.cordova(this, "querySampleType", {}, arguments); };
    HealthKit.prototype.querySampleTypeAggregated = function (options) { return core.cordova(this, "querySampleTypeAggregated", {}, arguments); };
    HealthKit.prototype.deleteSamples = function (options) { return core.cordova(this, "deleteSamples", {}, arguments); };
    HealthKit.prototype.monitorSampleType = function (options) { return core.cordova(this, "monitorSampleType", {}, arguments); };
    HealthKit.prototype.sumQuantityType = function (options) { return core.cordova(this, "sumQuantityType", {}, arguments); };
    HealthKit.prototype.saveQuantitySample = function (options) { return core.cordova(this, "saveQuantitySample", {}, arguments); };
    HealthKit.prototype.saveCorrelation = function (options) { return core.cordova(this, "saveCorrelation", {}, arguments); };
    HealthKit.prototype.queryCorrelationType = function (options) { return core.cordova(this, "queryCorrelationType", {}, arguments); };
    HealthKit.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: HealthKit, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    HealthKit.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: HealthKit });
    HealthKit.pluginName = "HealthKit";
    HealthKit.plugin = "com.telerik.plugins.healthkit";
    HealthKit.pluginRef = "window.plugins.healthkit";
    HealthKit.repo = "https://github.com/Telerik-Verified-Plugins/HealthKit";
    HealthKit.platforms = ["iOS"];
    HealthKit = tslib.__decorate([], HealthKit);
    return HealthKit;
}(core.AwesomeCordovaNativePlugin));
i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: HealthKit, decorators: [{
            type: i0.Injectable
        }], propDecorators: { available: [], checkAuthStatus: [], requestAuthorization: [], readDateOfBirth: [], readGender: [], readBloodType: [], readFitzpatrickSkinType: [], saveWeight: [], readWeight: [], saveHeight: [], readHeight: [], findWorkouts: [], saveWorkout: [], querySampleType: [], querySampleTypeAggregated: [], deleteSamples: [], monitorSampleType: [], sumQuantityType: [], saveQuantitySample: [], saveCorrelation: [], queryCorrelationType: [] } });

exports.HealthKit = HealthKit;
