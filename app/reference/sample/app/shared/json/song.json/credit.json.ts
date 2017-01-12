export class CreditJson {
    constructor() {
    }

    public CreditInput: any[] = [];

    public getEmptyCredit() {
        return {
            "song_moods": [
                {
                    "name": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    }
                }
            ],
        };
    }

    public getCreditKeys(creditObj: any) {
        let self = this;
        let keys: any[] = [];
        for (var key in creditObj) {
            let data = {
                'key': key,
                'order': creditObj[key].order
            }
            keys.push(data);
        }

        keys.sort(function (a, b) {
            return a.order - b.order;
        });
        return keys;
    }

    public getCreditInputs() {
        let self = this;
        return self.CreditInput;
    }

    public getCreditDisplayRule() {
        let self = this;
        return {
            "credit": {
                "director": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Director",
                        "ta": "இயக்குநர்"
                    },
                    "order": 18
                },
                "mixer": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Mixer",
                        "ta": "MixerTamil"
                    },
                    "order": 18
                },
                "masters": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Mixer",
                        "ta": "MixerTamil"
                    },
                    "order": 18
                },
                "composers": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Mixer",
                        "ta": "MixerTamil"
                    },
                    "order": 18
                },
                "lyricists": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Mixer",
                        "ta": "MixerTamil"
                    },
                    "order": 18
                },
                "singers": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Mixer",
                        "ta": "MixerTamil"
                    },
                    "order": 18
                },
                "producers": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Mixer",
                        "ta": "MixerTamil"
                    },
                    "order": 18
                },
                "arrangers": {
                    "label": {
                        "hi": "",
                        "te": "",
                        "en": "Mixer",
                        "ta": "MixerTamil"
                    },
                    "order": 18
                },
            }
        };
    }

    public getExCredit() {
        return {
            "mixers": [
                {
                    "name": {
                        "en": "Ashish Manchanda",
                        "ta": "ஆஷிஷ் மன்சண்ந்தா",
                        "hi": "Ashish Manchanda",
                        "te": "Ashish Manchanda"
                    }
                }
            ],
            "masters": [
                {
                    "name": {
                        "en": "Ashish Manchanda",
                        "ta": "ஆஷிஷ் மன்சண்ந்தா",
                        "hi": "Ashish Manchanda",
                        "te": "Ashish Manchanda"
                    }
                }
            ],
            "composers": [
                {
                    "name": {
                        "en": "Raghu Dixit",
                        "ta": "ரகு திக்‌ஷித்",
                        "hi": "Raghu Dixit",
                        "te": "Raghu Dixit"
                    }
                }
            ],
            "lyricists": [
                {
                    "name": {
                        "en": "Karky",
                        "ta": "கார்க்கி",
                        "hi": "Karky",
                        "te": "Karky"
                    }
                }
            ],
            "singers": [
                {
                    "name": {
                        "en": "Raghu Dixit",
                        "ta": "ரகு திக்‌ஷித்",
                        "hi": "Raghu Dixit",
                        "te": "Raghu Dixit"
                    }
                }
            ],
            "producers": [
                {
                    "name": {
                        "en": "Raghu Dixit",
                        "ta": "ரகு திக்‌ஷித்",
                        "hi": "Raghu Dixit",
                        "te": "Raghu Dixit"
                    }
                }
            ],
            "arrangers": [
                {
                    "name": {
                        "en": "Raghu Dixit",
                        "ta": "ரகு திக்‌ஷித்",
                        "hi": "Raghu Dixit",
                        "te": "Raghu Dixit"
                    }
                }
            ]
        };
    }
}