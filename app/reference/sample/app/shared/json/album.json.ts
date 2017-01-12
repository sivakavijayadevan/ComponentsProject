import {AlbumCollection} from '../models/album';

export class AlbumJson {
    constructor() {

    }

    public getJson(): AlbumCollection {
        return {
            "album": {
                "id": "",
                "language": {
                    "code": "",
                    "name": ""
                },
                "title": {
                    "en": "",
                    "ta": "",
                    "hi": "",
                    "te": ""
                },
                "description": {
                    "en": "",
                    "ta": "",
                    "hi": "",
                    "te": ""
                },
                "thumbnail": "",
                "type": {
                    "id": "",
                    "name": ""
                },
                "active": true
            }
        };
    }

    public getDetailedJson() {
        return {
            "id": "",
            "title": "",
            "data": this.getJson(),
            "published": "",
            "published_status": "",
            "created_date": "",
            "updated_date": "",
            "created_by": {
                "id": "",
                "user_name": ""
            },
            "updated_by": {
                "id": "",
                "user_name": ""
            }
        };
    }
    //  public getPagingParamJson() {
    //     return {
    //         "title": "",
    //         "published_status": "",
    //         "offset": "",
    //         "limit": "",
    //         "sorted_by": "",
    //         "sorted_order": ""         
    //     };
    // }
}