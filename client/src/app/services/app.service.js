"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
var core_1 = require("@angular/core");
var AppService = /** @class */ (function () {
    function AppService(apiServices, flashMessage) {
        this.apiServices = apiServices;
        this.flashMessage = flashMessage;
        this.user = {};
    }
    AppService.prototype.get_user = function () {
        this.user = JSON.parse(localStorage.getItem('data'));
        return this.user;
    };
    AppService.prototype.getBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                var base64String = reader.result;
                var base64File = base64String.split(',')[1];
                resolve(base64File);
            };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    AppService.prototype.getProjectFile = function (file) {
        if (file) {
            return this.apiServices.uploadURL + "projects/" + file;
        }
        else {
            return false;
        }
    };
    AppService.prototype.getProfilePic = function (image) {
        if (image) {
            return this.apiServices.uploadURL + "userImages/" + image;
        }
        else {
            return false;
        }
    };
    AppService.prototype.showFlash = function (flash) {
        for (var alert in flash) {
            this.flashMessage.show(flash[alert], { cssClass: 'alert alert-' + alert, timeout: 4000 });
        }
    };
    AppService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
