import {IMenuService} from './Interfaces/IMenuService';
import { Injectable, EventEmitter } from '../../node_modules/@angular/core';


@Injectable()
export class MenuService implements IMenuService {

    groupsSelected = new EventEmitter<any>();
    LoginPageSelected = new EventEmitter<any>();
    menuItems: Array<{title: string, component: any}>;

    getMenuItems(title:string) : any {
        return this.menuItems;
        }
}