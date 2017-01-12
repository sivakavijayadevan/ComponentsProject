import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';
import { DelayService } from '../../../shared/services/delay.service';
import { Auth } from '../../../auth_module/auth/auth';


import { LangInputComponent } from '../../../shared/components/lang.input.component/lang.input.component';
import { LangTextAreaComponent } from '../../../shared/components/lang.textarea.component/lang.textarea.component';
import { LangSelectComponent } from '../../../shared/components/lang.select.component/lang.select.component';
import { InputLableComponent } from '../../../shared/components/inputlable.component/inputlable.component';

import { SongJson } from '../../../shared/json/song.json';
import { CreditJson } from '../../../shared/json/song.json/credit.json';


@Component({
    selector: 'dpd-lang-sorting',
    templateUrl: 'src/app/shared/components/sorting.component/sorting.component.html',
    styleUrls: ['src/app/shared/components/sorting.component/sorting.component.css'],
    directives: [LangInputComponent, LangTextAreaComponent, LangSelectComponent, InputLableComponent],
    providers: [LangJson, SongJson, CreditJson, DelayService]
})

export class SortingComponent implements OnInit {
    /**
     * language of the input is display.
     */
    @Input('multilingual') multilingualAttr: string;

    /**
     * model object which has to be binded in input element.
     */
    @Input('inputvalue') inputValue: any;

    /**
     * send the value to the parent component.
     */
    @Output('datachange') dataChange = new EventEmitter();

    private LangControle = {};
    private CriticsArray: any;
    private Keys: any[] = [];
    private data: any = {};
    private editStatus: boolean;
    private loginData: any;
    private copyData: any;

    constructor(private _langJson: LangJson, private _songJson: SongJson, private _creditJson: CreditJson, private _delayService: DelayService, private _auth: Auth) {
        let self = this;
        self.inputValue = self._songJson.getJson();
        self.loginData = self._auth.getLoginStatus();
        self.Keys = self._creditJson.getCreditKeys(self.inputValue['display_rule']['entity']['credit']);
    }

    ngOnInit() {
        let self = this;
        self.Keys = self._creditJson.getCreditKeys(self.inputValue['display_rule']['entity']['credit']);
    }

    deleteCredit(key: string, index: number, order: number) {
        let self = this;
        delete self.inputValue['display_rule']['entity']['credit'][key];
        delete self.inputValue['song']['credit'][key];
        self.Keys.splice(index, 1);

        for (let i = index; i < self.Keys.length; i++) {
            self.Keys[i].order--;
            self.inputValue['display_rule']['entity']['credit'][self.Keys[i].key].order--;
        }
    }

    editCredit(key: string, index: number, order: number) {
        let self = this;
        self.editStatus = true;
        self.copyData = key;
        self.data = Object.assign({}, self.inputValue['display_rule']['entity']['credit'][key].label);
    }

    addCreditClose() {
        let self = this;
        self.data = {};
        self.editStatus = false;
    }

    addCredit(key: string, model: any) {
        let self = this;

        if (self.editStatus) {
            self.inputValue['display_rule']['entity']['credit'][self.copyData.toLowerCase()].label = model;
            self.addCreditClose();
            return;
        }
        key = key.trim();
        key = key.replace(/[^a-z\d\s]+/gi, "");
        key = key.replace(/[()]/g, "");
        key = key.replace(/\s+/g, "_");

        if (key)
            key = key.toLowerCase();


        self.inputValue['display_rule']['entity']['credit'][key] = {
            "label": model,
            "order": self.Keys.length + 1
        };

        self.inputValue['song']['credit'][key] = [
            {
                "name": {
                    "en": "",
                    "ta": "",
                    "hi": "",
                    "te": ""
                }
            }
        ];

        let keyData = {
            key: key,
            order: self.Keys.length + 1,
            new: true
        }

        self.Keys.push(keyData);
        self.addCreditClose();
    }

    listSort(direction: string, index: number, element: any) {
        let self = this;
        if (direction === "up" && index != 0) {
            var temp = self.Keys[index].order;
            var tempUp = self.Keys[index - 1].order;
            self.Keys[index].order = tempUp;
            self.Keys[index - 1].order = temp;
            self.inputValue['display_rule']['entity']['credit'][self.Keys[index].key].order = tempUp;
            self.inputValue['display_rule']['entity']['credit'][self.Keys[index - 1].key].order = temp;
            element.classList.add("sort-hightlight");

            self._delayService.Delay(300, function (index: number) {
                if (element.classList.contains("sort-hightlight")) {
                    element.classList.remove("sort-hightlight");
                }
            }, 1)
        } else if (direction === "down" && index != (self.Keys.length - 1)) {
            var temp = self.Keys[index].order;
            var tempDown = self.Keys[index + 1].order;
            self.Keys[index].order = tempDown;
            self.Keys[index + 1].order = temp;
            self.inputValue['display_rule']['entity']['credit'][self.Keys[index].key].order = tempDown;
            self.inputValue['display_rule']['entity']['credit'][self.Keys[index + 1].key].order = temp;
            element.classList.add("sort-hightlight");

            self._delayService.Delay(300, function (index: number) {
                if (element.classList.contains("sort-hightlight")) {
                    element.classList.remove("sort-hightlight");
                }
            }, 1)
        }

        self.Keys.sort(function (a, b) {
            return a.order - b.order;
        });
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        let self = this;
        for (let propName in changes) {
            let chng = changes[propName];

            if (typeof chng.currentValue == "object" && "song" in chng.currentValue) {
                self.inputValue = chng.currentValue;
                self.Keys = self._creditJson.getCreditKeys(self.inputValue['display_rule']['entity']['credit']);
            }
        }
    }

    removeInput(event: any, index: number) {
    }
}
