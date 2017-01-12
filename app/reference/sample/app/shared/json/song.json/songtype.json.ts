export class SongTypeJson {
    constructor() {
    }

    public getSongType() {
        return [
            {
                "id": "",
                "slug":"",
                "name": "Select Type"
            },
            {
                "id": 1,
                "slug":"flim_music",
                "name": "Film Music"
            },
            {
                "id": 2,
                "slug":"independent_music",
                "name": "Independent Music"
            },
        ];
    }
}