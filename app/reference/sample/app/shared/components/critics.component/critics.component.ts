import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { CORE_DIRECTIVES, NgIf } from '@angular/common';
import { LangInput, LangInputLable } from '../../models/langelement';
import { LangJson } from '../../../shared/json/lang.json';
import { AuthorJson } from '../../../shared/json/song.json/author.json';
import { Auth } from '../../../auth_module/auth/auth';

import { LangInputComponent } from '../../../shared/components/lang.input.component/lang.input.component';
import { InputLableComponent } from '../../../shared/components/inputlable.component/inputlable.component';
import { LangTextAreaComponent } from '../../../shared/components/lang.textarea.component/lang.textarea.component';
import { LangSelectComponent } from '../../../shared/components/lang.select.component/lang.select.component';

import { SongJson } from '../../../shared/json/song.json';
import { NAN } from '../../../shared/pipes/nan.pipe';

@Component({
    selector: 'dpd-lang-critics',
    templateUrl: 'src/app/shared/components/critics.component/critics.component.html',
    styleUrls: ['src/app/shared/components/critics.component/critics.component.css'],
    directives: [LangInputComponent, LangTextAreaComponent, LangSelectComponent, InputLableComponent],
    providers: [LangJson, SongJson, AuthorJson],
    pipes: [NAN]
})

export class CriticsComponent implements OnInit {
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
    private authorArray: any;
    private loginData: any;

    constructor(private _langJson: LangJson, private _songJson: SongJson, private _authorJson: AuthorJson, private _auth: Auth) {
        let self = this;
        self.inputValue = self._songJson.getSongCriticsObjArray();
        self.CriticsArray = self._songJson.getSongCriticsArray();
        self.authorArray = self._authorJson.getJson();
        self.loginData = self._auth.getLoginStatus();
    }

    ngOnInit() {
        let self = this;

    }

    AddCritics() {
        let self = this;
        self.inputValue.push(self._songJson.getSongCriticsObj());
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        let self = this;

        if ("inputValue" in changes) {
            let value = changes["inputValue"];
            value.currentValue.forEach(function (critics: any) {
                let total = self.calcRating(critics);
                critics.rating = total;
                critics.review.overall.score = total;
            });
        }
    }

    removeInput(event: any, index: number) {
    }

    selectionChange(event: any, index: number) {
        let self = this;
        event.index = index;
        self.dataChange.emit(event);
        self.inputValue[index]['author'] = event.value;
    }

    onChange(index: number, event: any) {
        console.log(event);
        // if (event.target.value > 14) {
        //     event.target.value = 14;
        // }

        // if (event.target.value < 0) {
        //     event.target.value = 0;
        // }
        let self = this;
        let total = self.calcRating(self.inputValue[index]);
        let data = {
            index: index,
            value: total,
            key: "rating"
        };
        self.dataChange.emit(data);
        self.inputValue[index].rating = total;
        self.inputValue[index].review.overall.score = total;
    }

    calcRating(data: any) {
        let self = this;
        let total = 0;
        let count = 0;
        self.CriticsArray.forEach(function (params: any) {
            if (params !== "overall") {
                let score = data.review[params].score;
                total += score ? parseInt(score) : 0;
                if (score) {
                    count++;
                }
            }
        });
        console.log("critics", count);
        total = total / count;
        return total;
    }
}
