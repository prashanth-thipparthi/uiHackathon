"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var stat_1 = require("./model/stat");
var stat_url = "http://localhost:1235/rest/stats/";
var TrackerService = /** @class */ (function () {
    function TrackerService(http) {
        this.http = http;
        this.allEvents = ['focus', 'blur', 'mouseover', 'mousedown', 'mouseup', 'mousemove', 'click'];
    }
    TrackerService.prototype.addStat = function (stat) {
        return this.http.post(stat_url, stat).map(function (resp) { return resp.json(); });
    };
    TrackerService.prototype.masterHandler = function () {
        var event = event || window.event;
        var elementId = "";
        for (var i = 0; i < event.path.length; i++) {
            if (event.path[i].id) {
                elementId = event.path[i].id;
                break;
            }
        }
        if (elementId == "")
            return;
        var classes = event.target.className.replace(/ /g, '#');
        var targetName = event.target.nodeName;
        if (classes)
            targetName += "$" + classes;
        var statObj = new stat_1.Stat();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var dateStr = "";
        if (dd < 10) {
            dateStr = '0' + dd;
        }
        else {
            dateStr = dd.toString();
        }
        var monthStr = "";
        if (mm < 10) {
            monthStr = '0' + mm;
        }
        else {
            monthStr = mm.toString();
        }
        var todayStr = dateStr + '-' + monthStr + '-' + yyyy;
        statObj.date = todayStr;
        statObj.widget = elementId;
        switch (event.type) {
            case 'click':
            case 'focus':
                statObj.action = "click";
                this.addStat(statObj).subscribe(function (data) {
                });
                ;
                break;
            case 'mouseover':
            case 'mousedown':
            case 'mouseup':
            case 'mousemove':
                statObj.action = "activesecs";
                this.addStat(statObj).subscribe(function (data) {
                });
                ;
                break;
        }
    };
    TrackerService.prototype.bindAllEvents = function (selector) {
        console.log("shankar");
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            for (var key in this.allEvents) {
                elements[i].addEventListener(this.allEvents[key], this.masterHandler.bind(this), false);
            }
        }
    };
    TrackerService = __decorate([
        core_1.Injectable()
    ], TrackerService);
    return TrackerService;
}());
exports.TrackerService = TrackerService;
//bindAllEvents('*', masterHandler);
