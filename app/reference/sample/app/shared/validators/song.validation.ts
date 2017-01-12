import { Component} from '@angular/core';
import { LangJson } from '../../shared/json/lang.json';
import { CreditJson } from '../../shared/json/song.json/credit.json';
import { UrlValidators } from '../../shared/validators/url.validation';

@Component({
    providers: [LangJson, CreditJson, UrlValidators]
})

export class SongValidators {
    private validationArr: string[];
    private langArr: string[];
    private infoArray: string[];

    constructor(private _langJson: LangJson,
        private _urlValidation: UrlValidators,
        private _creditJson: CreditJson) {
        let self = this;
        self.infoArray = ['instruments', 'thaalams', 'lyric_genres', 'music_genres', 'best_seasons_to_listen', 'lyric_styles'];
        self.langArr = _langJson.getLangArray();
    }

    /**
    * function declaration for song validation
    */
    public SongRequiredValid(result: any) {
        let self = this;
        self.validationArr = [];
        self.requiredValidation(result.data.song.language, "Song language");
        self.languageValid(result.data.song.title, "Title", true);
        self.requiredValidation(result.data.song.mood, "Song Mood");
        self.requiredValidation(result.data.song.type, "Song Type");
        self.requiredValidation(result.data.song.published_on, "Song Published On");
        self.urlValid(result.data.song.thumbnail, "Thumbnail", false, true);
        self.urlValid(result.data.song.poster, "Poster", false, true);
        return self.validationArr;
    }

    /**
   * function declaration for song validation
   */
    public AlbumRequiredValid(result: any) {
        let self = this;
        self.validationArr = [];
        self.requiredValidation(result.data.album.language, "album language");
        self.languageValid(result.data.album.title, "Title", true);
        self.requiredValidation(result.data.album.type, "album Type");
        self.urlValid(result.data.album.thumbnail, "Thumbnail", false, true);
        return self.validationArr;
    }

    /**
   * function declaration for song validation
   */
    public AlbumValid(result: any) {
        let self = this;
        self.validationArr = [];
        self.requiredValidation(result.data.album.language, "album language");
        self.requiredValidation(result.data.album.type, "album Type");
        self.languageValid(result.data.album.title, "Title", true);
        self.languageValid(result.data.album.description, "Description", true);
        self.urlValid(result.data.album.thumbnail, "Thumbnail", true, true);
        return self.validationArr;
    }

    /**
     * function declaration for song validation
     */
    public SongValid(result: any) {
        let self = this;
        self.validationArr = [];
        self.requiredValidation(result.data.song.language, "Song language");

        self.languageValid(result.data.song.title, "Title", true);

        self.requiredValidation(result.data.song.mood, "Song Mood");
        self.requiredValidation(result.data.song.type, "Song Type");
        self.requiredValidation(result.data.song.published_on, "Song Published On");
        self.requiredValidation(result.data.song.info.duration, "Duration");

        self.languageValid(result.data.song.description, "Description", true);

        self.urlValid(result.data.song.thumbnail, "Thumbnail", true, true);
        self.urlValid(result.data.song.poster, "Poster", true, true);

        self.itemRequiredValidation(result.data.song.item, "item");

        self.infoArray.forEach(function (Key: string) {
            result.data.song.info[Key].forEach(function (params: any) {
                self.languageValid(params.name, Key, false);
            });
        });
        console.log("dddd", result.data);

        let Keys = self._creditJson.getCreditKeys(result.data.display_rule['entity']['credit']);
        console.log(Keys);
        Keys.forEach(function (key: any) {
            result.data.song.credit[key.key].forEach(function (params: any) {
                self.languageValid(params.name, key.key, false);
            });
        });

        result.data.song.musics.forEach(function (params: any) {
            self.languageValid(params.instrument.name, "instument", false);
            params.players.forEach(function (subParams: any) {
                self.languageValid(subParams.name, "Players", false);
            })
        });

        result.data.song.callertunes.forEach(function (params: any) {
            self.callerTuneValidation(params, "callertune");
        });

        result.data.song.critics.forEach(function (params: any) {
            self.criticsValidation(params, "critics ");
        });

        return self.validationArr;
    }

    /**
     * required validate function
     */
    public requiredValidation(value: any, prefixText: string) {
        let self = this;

        if (!value) {
            self.validationArr.push(prefixText + " required.");
            return false;
        }

        if (typeof value == "object") {
            for (let key in value) {
                if (typeof value[key] != "number" && !value[key].trim()) {
                    self.validationArr.push(prefixText + " required.");
                    return false;
                }
            }
        } else {
            if (typeof value != "number" && !value.trim()) {
                self.validationArr.push(prefixText + " required.");
                return false;
            }

            if (!value) {
                self.validationArr.push(prefixText + " required.");
                return false;
            }
        }

        return true;
    }

    /**
     * language validate function
     */
    public languageValid(langData: any, prefixText: string, required: boolean) {
        let self = this;
        let errorMessage = "";

        if (langData[self._langJson.english].trim() || langData[self._langJson.tamil].trim() || langData[self._langJson.hindi].trim() || langData[self._langJson.telugu].trim()) {
            self.langArr.forEach(function (params: string) {
                if (!langData[params].trim()) {
                    errorMessage += ", " + params;
                }
            });

            if (errorMessage) {
                errorMessage = prefixText + " " + errorMessage + ".";
                self.validationArr.push(errorMessage);
                return false;
            }

            return true;
        }

        if (required) {
            errorMessage = prefixText + " required.";
            self.validationArr.push(errorMessage);
            return false;
        }
        return true;
    }

    /**
     * Url validate function
     */
    public urlValid(url: string, prefixText: string, required: boolean, message: boolean) {
        let self = this;

        if (url.trim() && !self._urlValidation.validate(url)) {
            self.validationArr.push(prefixText + " Invalid Url");
            return false;
        }

        if (required && !self._urlValidation.validate(url)) {
            if (message)
                self.validationArr.push(prefixText + " required.");

            return false;
        }

        return true;
    }

    /** 
     * Items validate function
     */
    public itemRequiredValidation(value: any, prefixText: string) {
        let self = this;
        let validationData = {};
        let hasValue = false;
        let hasSubValue = false;
        let errorMessage = "";
        let keys = ["audio", "karaoke", "lyric", "making", "video"];
        let serverKeys = ["akamai", "aws", "ventuno"];
        keys.forEach(function (params: any) {
            serverKeys.forEach(function (subParams: any) {
                let alternate = self.urlValid(value[params][subParams].alternative_link, params + " " + subParams + " alternate link", true, false);
                let link = self.urlValid(value[params][subParams].link, params + " " + subParams + " link", true, false);
                let key = value[params][subParams].key.trim() ? true : false;
                if (alternate || link || key) {
                    validationData[params] = true;
                    hasValue = true;
                }
            });
        });

        if (!hasValue) {
            self.validationArr.push("item required.");
        }

        for (let key in validationData) {
            if (value[key].aws.link.trim() || value[key].aws.alternative_link.trim()) {
                let alternate = self.urlValid(value[key].aws.link, key + "aws link", true, true);
                let link = self.urlValid(value[key].aws.alternative_link, key + "aws alternative link", true, true);
            } else {
                let sKey = self.requiredValidation(value[key].ventuno.key, key + " ventuno key ");
            }
        }
    }

    /**
     * callertune validate function
     */
    public callerTuneValidation(value: any, prefixText: string) {
        let self = this;
        let providerStatus = true;
        for (let key in value.provider) {
            if (!value.provider[key].trim()) {
                providerStatus = false;
            }
        }
        if (!self.urlValid(value.url, prefixText + " URL", providerStatus, true)) {
            self.requiredValidation(value.provider, prefixText + " Provider");
        }
    }

    /**
     * critics validate function
     */
    public criticsValidation(value: any, prefixText: string) {
        let self = this;
        let scoreStatus = false;
        for (let key in value.review) {
            console.log(value.review[key].score);
            if (value.review[key].score) {
                self.languageValid(value.review[key].comment, prefixText + " " + key + " comments", true);
                scoreStatus = true;
            }

            if (!self.languageValid(value.review[key].comment, prefixText + " " + key + " comments", false)) {
                self.requiredValidation(value.review[key].score, prefixText + " " + key + " score");
                scoreStatus = true;
            }

        }

        if (scoreStatus) {
            self.requiredValidation(value.rating, prefixText + " rating");
            self.languageValid(value.author.name, prefixText + " author name", true);
            self.urlValid(value.author.image, prefixText + " author image", true, true);
        }
    }
}