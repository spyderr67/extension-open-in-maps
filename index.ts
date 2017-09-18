import { Extension } from "@teamsqlio/ts-extension-sdk/dist/source/Extension";
import { IExtensionContextMenu } from "@teamsqlio/ts-extension-sdk/dist/source/interfaces/groups/IExtensionContextMenu"
import { MenuItem } from "@teamsqlio/ts-extension-sdk/dist/source/menu/MenuItem"
import { DataGridCellContainer } from "@teamsqlio/ts-extension-sdk/dist/source/data/DataGridCellContainer"
import { DataGridCell } from "@teamsqlio/ts-extension-sdk/dist/source/data/DataGridCell"
import { IMenuItemAction } from "@teamsqlio/ts-extension-sdk/dist/source/interfaces/menu/IMenuItemAction"
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
                var lng = selectedData[0].cells[1].value;
                var result = lat + "," + lng;
                var reg = /-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,},-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,}/;

                if (reg.exec(result)) {
                    //do nothing
                } else {
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