import {SongCollection} from '../models/song';
import * as moment from 'moment/moment';
export class SongJson {
    private nullable: any = null;
    constructor() {

    }

    public getJson(): SongCollection {
        return {
            "song": {
                "id": "",
                "title": {
                    "en": "",
                    "ta": "",
                    "hi": "",
                    "te": ""
                },
                "thumbnail": "",
                "poster": "",
                "type": {
                    "id": "",
                    "name": ""
                },
                "description": {
                    "en": "",
                    "ta": "",
                    "hi": "",
                    "te": ""
                },
                "language": {
                    "code": "",
                    "name": ""
                },
                "item": {
                    "video": {
                        "aws": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "ventuno": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "akamai": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        }
                    },
                    "lyric": {
                        "aws": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "ventuno": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "akamai": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        }
                    },
                    "audio": {
                        "aws": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "ventuno": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "akamai": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        }
                    },
                    "making": {
                        "aws": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "ventuno": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "akamai": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        }
                    },
                    "karaoke": {
                        "aws": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "ventuno": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        },
                        "akamai": {
                            "link": "",
                            "alternative_link": "",
                            "key": ""
                        }
                    }
                },
                "mood": {
                    "id": "",
                    "name": ""
                },
                "lyrics": [
                    {
                        "data": "",
                        "language": {
                            "name": "English",
                            "code": "en"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Tamil",
                            "code": "ta"
                        }
                    }
                ],
                "critics": this.getSongCriticsObjArray(),
                "phonetic_lyrics": [
                    {
                        "data": "",
                        "language": {
                            "name": "English",
                            "code": "en"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Tamil",
                            "code": "ta"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Hindi",
                            "code": "hi"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Telugu",
                            "code": "te"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Malayalam",
                            "code": "ml"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Kanadam",
                            "code": "ka"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Bengali",
                            "code": "be"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Gujarathi",
                            "code": "gu"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Marathi",
                            "code": "mr"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "Oriya",
                            "code": "or"
                        }
                    },
                    {
                        "data": "",
                        "language": {
                            "name": "konkani",
                            "code": "ko"
                        }
                    }
                ],
                "musics": [
                    {
                        "players": [
                            {
                                "name": {
                                    "en": "",
                                    "ta": "",
                                    "hi": "",
                                    "te": ""
                                }
                            }
                        ],
                        "instrument": {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    }
                ],
                "credit": {
                    "mixers": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    ],
                    "masters": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    ],
                    "composers": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    ],
                    "lyricists": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    ],
                    "singers": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    ],
                    "featuring": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    ],
                    "producers": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": ""
                            }
                        }
                    ],
                    "arrangers": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "recorded_studios": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "lyric_video_senior_editor": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "lyric_video_images": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "manager_of_visual_content": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "sound_engineers": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "lyric_video_editor": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "lyric_art": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "translator": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "director": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "audio_label": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "director_of_photography": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "editor": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "art": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "rap": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ]

                },
                "info": {
                    "lyric_languages": [
                        {
                            "name": "",
                            "code": ""
                        }
                    ],
                    "instruments": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "thaalams": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "lyric_genres": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "music_genres": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "song_moods": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "best_seasons_to_listen": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "lyric_styles": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "duration": "",
                    "best_times_to_listen": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ],
                    "raagams": [
                        {
                            "name": {
                                "en": "",
                                "ta": "",
                                "hi": "",
                                "te": "",
                            }
                        }
                    ]
                },
                "callertunes": [
                    this.getCallerTune()
                ],
                "published_on": moment().toISOString(),
                "active": true
            },
            "display_rule": {
                "entity": {
                    "credit": {
                        "composers": {
                            "label": {
                                "hi": "संगीतकार",
                                "te": "సంగీతకారులు",
                                "en": "Composers (s)",
                                "ta": "இசையமைப்பாளர் (கள்)"
                            },
                            "order": 1
                        },
                        "lyricists": {
                            "label": {
                                "hi": "गीतकार",
                                "te": "గీత రచయిత",
                                "en": "Lyricist (s)",
                                "ta": "பாடலாசிரியர் (கள்)"
                            },
                            "order": 2
                        },
                        "singers": {
                            "label": {
                                "hi": "गायक",
                                "te": "గాయకులు",
                                "en": "Singer (s)",
                                "ta": "பாடகர் (கள்)"
                            },
                            "order": 3
                        },
                        "featuring": {
                            "label": {
                                "hi": "(वीडियो) फिचरिंग",
                                "te": "(వీడియో) పాల్గొన్నవారు",
                                "en": "(Video) Featuring",
                                "ta": "(காணொளி) நடிகர்கள்"
                            },
                            "order": 4
                        },
                        "sound_engineers": {
                            "label": {
                                "hi": "साउंड इंजीनियर",
                                "te": "సౌండ్ ఇంజనీర్",
                                "en": "Sound engineer",
                                "ta": "ஒலி பொறியாளர்"
                            },
                            "order": 5
                        },
                        "producers": {
                            "label": {
                                "hi": "निर्माता (ते)",
                                "te": "నిర్మాణం",
                                "en": "Producer (s)",
                                "ta": "தயாரிப்பாளர் (கள்)"
                            },
                            "order": 6
                        },
                        "arrangers": {
                            "label": {
                                "hi": "द्वारा संयोजित",
                                "te": "ఏర్పాటు చేసినవారు",
                                "en": "Arranged by",
                                "ta": "ஒருங்கிணைப்பு"
                            },
                            "order": 7
                        },
                        "masters": {
                            "label": {
                                "hi": "द्वारा मास्टर्ड",
                                "te": "మాస్టరింగ్",
                                "en": "Masterd by",
                                "ta": "ஒலிச்சீரமைவு"
                            },
                            "order": 8
                        },
                        "recorded_studios": {
                            "label": {
                                "hi": "में दर्ज किया गया",
                                "te": "రికార్డింగ్ స్ధలము",
                                "en": "Recorded at",
                                "ta": "ஒலிப்பதிவுக் கூடம்"
                            },
                            "order": 9
                        },
                        "manager_of_visual_content": {
                            "label": {
                                "hi": "",
                                "te": "",
                                "en": "Manager of visual content",
                                "ta": "காட்சி கூறுகள் மேலாளர்"
                            },
                            "order": 10
                        },
                        "lyric_video_images": {
                            "label": {
                                "hi": "",
                                "te": "",
                                "en": "Lyric video images",
                                "ta": "வரிக்காணொளி படங்கள்"
                            },
                            "order": 11
                        },
                        "lyric_video_senior_editor": {
                            "label": {
                                "hi": "",
                                "te": "",
                                "en": "Lyric video senior editor",
                                "ta": "வரிக்காணொளி மூத்த தொகுப்பாளர்"
                            },
                            "order": 12
                        },
                        "lyric_video_editor": {
                            "label": {
                                "hi": "",
                                "te": "",
                                "en": "Lyric video editor",
                                "ta": "வரிக்காணொளி தொகுப்பாளர்"
                            },
                            "order": 13
                        },
                        "lyric_art": {
                            "label": {
                                "hi": "",
                                "te": "",
                                "en": "Lyric art",
                                "ta": "வரிக்காணொளி படங்கள்"
                            },
                            "order": 14
                        },
                        "translator": {
                            "label": {
                                "hi": "",
                                "te": "",
                                "en": "Translator",
                                "ta": "மொழியாக்கம்"
                            },
                            "order": 15
                        },
                        "mixers": {
                            "label": {
                                "hi": "द्वारा मिश्रित",
                                "te": "మిక్సింగ్",
                                "en": "Mixed by",
                                "ta": "இசைக்கலப்பு"
                            },
                            "order": 16
                        },
                        "director": {
                            "label": {
                                "en": "Director",
                                "ta": "இயக்குநர்",
                                "hi": "Director",
                                "te": "Director"
                            },
                            "order": 17
                        },
                        "audio_label": {
                            "label": {
                                "en": "Audio Label",
                                "ta": "ஆடியோ லேபிள்",
                                "hi": "Audio Label",
                                "te": "Audio Label"
                            },
                            "order": 18
                        },
                        "director_of_photography": {
                            "label": {
                                "en": "Director of photography",
                                "ta": "ஒளிப்பதிவாளர்",
                                "hi": "Director of photography",
                                "te": "Director of photography"
                            },
                            "order": 19
                        },
                        "editor": {
                            "label": {
                                "en": "Editor",
                                "ta": "தொகுப்பாளர்",
                                "hi": "Editor",
                                "te": "Editor"
                            },
                            "order": 20
                        },
                        "art": {
                            "label": {
                                "en": "Art",
                                "ta": "கலை",
                                "hi": "Art",
                                "te": "Art"
                            },
                            "order": 21
                        },
                        "rap": {
                            "label": {
                                "en": "Rap",
                                "ta": "ராப்",
                                "hi": "Rap",
                                "te": "Rap"
                            },
                            "order": 22
                        },
                    },
                    "info": {
                        "instruments": {
                            "label": {
                                "hi": "वाद्ययंत्र",
                                "te": "వాయిద్యాలు",
                                "en": "Instruments",
                                "ta": "கருவிகள்"
                            },
                            "order": 1
                        },
                        "raagams": {
                            "label": {
                                "hi": "रागम",
                                "te": "రాగం",
                                "en": "Raagam",
                                "ta": "ராகம்"
                            },
                            "order": 2
                        },
                        "thaalams": {
                            "label": {
                                "hi": "थालम",
                                "te": "తాళం",
                                "en": "Thaalam",
                                "ta": "தாளம் "
                            },
                            "order": 3
                        },
                        "music_genres": {
                            "label": {
                                "hi": "संगीत शैली (याँ)",
                                "te": "సంగీతం యొక్క శైలి ",
                                "en": "Music genre(s)",
                                "ta": "இசை வகை (கள்)"
                            },
                            "order": 4
                        },
                        "lyric_genres": {
                            "label": {
                                "hi": "गीत की शैली (याँ)",
                                "te": "పదాల శైలి",
                                "en": "Lyric genre(s)",
                                "ta": "பாடல் வகை (கள்)"
                            },
                            "order": 5
                        },
                        "lyric_moods": {
                            "label": {
                                "hi": "गीत का मूड",
                                "te": "పాట యొక్క శైలి",
                                "en": "Song mood",
                                "ta": "பாடல் மனநிலை"
                            },
                            "order": 6
                        },
                        "lyric_styles": {
                            "label": {
                                "hi": "गीत की शैली",
                                "te": "పదాల యొక్క శైలి",
                                "en": "Lyric style",
                                "ta": "மொழி நடை"
                            },
                            "order": 7
                        },
                        "lyric_languages": {
                            "label": {
                                "hi": "गीत की भाषा (एँ)",
                                "te": "పాట యొక్క భాష (లు)",
                                "en": "Lyric language(s)",
                                "ta": "பாடல் மொழி (கள்)"
                            },
                            "order": 8
                        },
                        "best_times_to_listen": {
                            "label": {
                                "hi": "दिन का समय",
                                "te": "వినుటకు అరుదైన సమయం",
                                "en": "Best time to listen",
                                "ta": "பாடலைக் கேட்க உகந்த நேரம்"
                            },
                            "order": 9
                        },
                        "best_seasons_to_listen": {
                            "label": {
                                "hi": "मौसम",
                                "te": "వినుటకు అరుదైన ఋతువు",
                                "en": "Best season to listen",
                                "ta": "பாடலைக் கேட்க உகந்த காலம்"
                            },
                            "order": 10
                        },
                        "launch_date": {
                            "label": {
                                "hi": "लांच की तारीख",
                                "te": "లాంచ్ అయిన తారీఖు",
                                "en": "Date of launch",
                                "ta": "வெளியீடு"
                            },
                            "order": 11
                        },
                        "duration": {
                            "label": {
                                "hi": "अवधि",
                                "te": "సమయం",
                                "en": "Duration",
                                "ta": "நேர அளவு"
                            },
                            "order": 12
                        }
                    }
                }
            }
        };
    }

    public getDetailedJson() {
        return {
            "album_id": "",
            "id": "",
            "song_title": "",
            "data": this.getJson(),
            "published_status": "",
            "published": "",
            "status": "",
            "created_date": "",
            "updated_date": "",
            "created_by": "",
            "updated_by": ""
        };
    }

    public getCallerTune() {
        return {
            "provider": {
                "id": "",
                "name": ""
            },
            "url": ""
        };
    }

    public getSongInfoArray() {
        return [
            {
                "inputKey": "lyric_languages",
                "jsonKey": "lyric_languages"
            },
            {
                "inputKey": "instruments",
                "jsonKey": "instruments"
            },
            {
                "inputKey": "thaalams",
                "jsonKey": "thaalams"
            },
            {
                "inputKey": "lyric_genres",
                "jsonKey": "lyric_genres"
            },
            {
                "inputKey": "music_genres",
                "jsonKey": "music_genres"
            },
            {
                "inputKey": "song_moods",
                "jsonKey": "song_moods"
            },
            {
                "inputKey": "best_seasons_to_listen",
                "jsonKey": "best_seasons_to_listen"
            },
            {
                "inputKey": "lyric_styles",
                "jsonKey": "lyric_styles"
            },
            {
                "inputKey": "best_times_to_listen",
                "jsonKey": "best_times_to_listen"
            },
        ];
    }

    public getSongCriticsArray() {
        return ["vocal", "instrument", "tune", "lyric", "overall"];
    }

    public getSongCriticsObjArray() {

        return [
            {
                "rating": this.nullable,
                "author": {
                    "name": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    },
                    "slug": "",
                    "image": ""
                },
                "review": {
                    "vocal": {
                        "score": this.nullable,
                        "comment": {
                            "en": "",
                            "ta": "",
                            "hi": "",
                            "te": ""
                        }
                    },
                    "instrument": {
                        "score": this.nullable,
                        "comment": {
                            "en": "",
                            "ta": "",
                            "hi": "",
                            "te": ""
                        }
                    },
                    "overall": {
                        "score": this.nullable,
                        "comment": {
                            "en": "",
                            "ta": "",
                            "hi": "",
                            "te": ""
                        }
                    },
                    "tune": {
                        "score": this.nullable,
                        "comment": {
                            "en": "",
                            "ta": "",
                            "hi": "",
                            "te": ""
                        }
                    },
                    "lyric": {
                        "score": this.nullable,
                        "comment": {
                            "en": "",
                            "ta": "",
                            "hi": "",
                            "te": ""
                        }
                    }
                }
            }
        ];
    }

    public getSongCriticsObj() {
        return {
            "rating": this.nullable,
            "author": {
                "name": {
                    "en": "",
                    "ta": "",
                    "hi": "",
                    "te": ""
                },
                "slug": "",
                "image": ""
            },
            "review": {
                "vocal": {
                    "score": this.nullable,
                    "comment": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    }
                },
                "instrument": {
                    "score": this.nullable,
                    "comment": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    }
                },
                "overall": {
                    "score": this.nullable,
                    "comment": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    }
                },
                "tune": {
                    "score": this.nullable,
                    "comment": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    }
                },
                "lyric": {
                    "score": this.nullable,
                    "comment": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    }
                }
            }
        };
    }

    public getSongMusicsObjArray() {
        return [
            this.getSongMusicsObj(),
            this.getSongMusicsObj(),
            this.getSongMusicsObj(),
            this.getSongMusicsObj(),
        ];
    }

    public getSongMusicsObj() {
        return {
            "players": [
                {
                    "name": {
                        "en": "",
                        "ta": "",
                        "hi": "",
                        "te": ""
                    }
                }
            ],
            "instrument": {
                "name": {
                    "en": "",
                    "ta": "",
                    "hi": "",
                    "te": ""
                }
            }
        };
    }
}
