import { Extension } from "@teamsql-extensions/ts-extension-sdk/dist/source/Extension";
import { IExtensionContextMenu } from "@teamsql-extensions/ts-extension-sdk/dist/source/interfaces/groups/IExtensionContextMenu"
import { MenuItem } from "@teamsql-extensions/ts-extension-sdk/dist/source/menu/MenuItem"
import { DataGridCellContainer } from "@teamsql-extensions/ts-extension-sdk/dist/source/data/DataGridCellContainer"
import { DataGridCell } from "@teamsql-extensions/ts-extension-sdk/dist/source/data/DataGridCell"
import { IMenuItemAction } from "@teamsql-extensions/ts-extension-sdk/dist/source/interfaces/menu/IMenuItemAction"
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

export class TeamSQLExtension extends Extension implements IExtensionContextMenu {

    getMenu(): Array<MenuItem> {
        let me = this;
        let menu = new Array<MenuItem>();
        let showMenuFunction: IMenuItemAction;

        let menuItem = new MenuItem("Show in Google Maps", null, (selectedData: DataGridCellContainer[], allData: DataGridCellContainer[]) => {
            if (selectedData !== null && selectedData !== undefined && Array.isArray(selectedData) && selectedData.length === 1 && selectedData[0].cells.length === 2) {
                var lat = selectedData[0].cells[0].value;
                var lng = selectedData[0].cells[1];
                var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");

                if (reg.exec(lat)) {
                    //do nothing
                } else {
                    this.showAlert("First value must be latitude.");
                    return;
                }

                if (reg.exec(lng)) {
                    //do nothing
                } else {
                    this.showAlert("First value must be longitude.");
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