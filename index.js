"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Extension_1 = require("@teamsql-extensions/ts-extension-sdk/dist/source/Extension");
const MenuItem_1 = require("@teamsql-extensions/ts-extension-sdk/dist/source/menu/MenuItem");
class TeamSQLExtension extends Extension_1.Extension {
    getMenu() {
        let me = this;
        let menu = new Array();
        let showMenuFunction;
        let menuItem = new MenuItem_1.MenuItem("Show in Google Maps", null, (selectedData, allData) => {
            if (selectedData !== null && selectedData !== undefined && Array.isArray(selectedData) && selectedData.length === 1 && selectedData[0].cells.length === 2) {
                var lat = selectedData[0].cells[0].value;
                var lng = selectedData[0].cells[1].value;
                var result = lat + "," + lng;
                var reg = /-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,},-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,}/;
                if (reg.exec(result)) {
                    //do nothing
                }
                else {
                    this.showAlert("First item must be latitude then longitude.");
                    return;
                }
                var result = lat + "," + lng;
                var mapsURL = "http://www.google.com/maps/place/" + result;
                this.openURL(mapsURL);
            }
            else {
                this.showAlert("Select only 2 cells, first item must be latitude then longitude.");
            }
        });
        menu.push(menuItem);
        return menu;
    }
}
exports.TeamSQLExtension = TeamSQLExtension;
//# sourceMappingURL=index.js.map