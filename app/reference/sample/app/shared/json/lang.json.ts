import {RadioButtonPros} from '../models/radiobutton';

export class LangJson {

    public tamil: string = "ta";
    public english: string = "en";
    public hindi: string = "hi";
    public telugu: string = "te";

    public homeLanguage ="en";

    constructor() {
    }

    public getJson(): RadioButtonPros[] {
        return [
            {
                "groupname": "lang",
                "option": {
                    displayName: "EN",
                    value: "en",
                    status: true,
                    id: "EnLang"
                }
            },
            {
                "groupname": "lang",
                "option": {
                    displayName: "TA ",
                    value: "ta",
                    status: false,
                    id: "TaLang"
                }
            },
            {
                "groupname": "lang",
                "option": {
                    displayName: "HI ",
                    value: "hi",
                    status: false,
                    id: "HiLang"
                }
            },
            {
                "groupname": "lang",
                "option": {
                    displayName: "TE",
                    value: "te",
                    status: false,
                    id: "TeLang"
                }
            },
        ];
    }

    public getServerJson(): RadioButtonPros[] {
        return [
            {
                "groupname": "server",
                "option": {
                    displayName: "AWS ",
                    value: "aws",
                    status: true,
                    id: "awsServer"
                }
            },
            {
                "groupname": "server",
                "option": {
                    displayName: "Ventuno ",
                    value: "ventuno",
                    status: false,
                    id: "ventunoServer"
                }
            },
            {
                "groupname": "server",
                "option": {
                    displayName: "Akamai ",
                    value: "akamai",
                    status: false,
                    id: "akamaiServer"
                }
            }
        ];
    }

    public getLangJson(): any {
        return {
            "name": {
                "en": "",
                "ta": "",
                "hi": "",
                "te": ""
            }
        };
    }

    public getLangObj(): any {
        return {
            "en": "",
            "ta": "",
            "hi": "",
            "te": ""
        };
    }

    public getLangJaonWithId(sendSelectOption: any) {
        return {
            "name": "",
            "code": ""
        };
    }

    public getLangArray() {
        return [this.english, this.tamil, this.hindi, this.telugu];
    }
}