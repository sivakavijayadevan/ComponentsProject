import { Language, Village } from '../../shared/models/album';


export interface Types {
    id: string;
    name: string;
}

export interface Aws {
    link: string;
    alternative_link: string;
    key: string;
}

export interface Video {
    aws: Aws;
    ventuno: Aws;
    akamai: Aws;
}

export interface Item {
    video: Video;
    lyric: Video;
    audio: Video;
    making: Video;
    karaoke: Video;
}

export interface Language2 {
    name: string;
    code: string;
}

export interface Lyric {
    data: string;
    language: Language2;
}

export interface Author {
    name: Language;
    slug: string;
    image: string;
}

export interface Vocal {
    score?: number;
    comment: Language;
}

export interface Review {
    vocal: Vocal;
    instrument: Vocal;
    overall: Vocal;
    tune: Vocal;
    lyric: Vocal;
}

export interface Critic {
    rating?: number;
    author: Author;
    review: Review;
}

export interface Player {
    name: Language;
}

export interface Music {
    players: Player[];
    instrument: Player;
}

export interface Credit {
    mixers: Player[];
    masters: Player[];
    composers: Player[];
    lyricists: Player[];
    singers: Player[];
    featuring: Player[];
    producers: Player[];
    arrangers: Player[];
    recorded_studios: Player[];
    lyric_video_senior_editor: Player[];
    lyric_video_images: Player[];
    manager_of_visual_content: Player[];
    sound_engineers: Player[];
    lyric_video_editor: Player[];
    lyric_art: Player[];
    translator: Player[];
}

export interface Info {
    lyric_languages: Language2[];
    instruments: Player[];
    thaalams: Player[];
    lyric_genres: Player[];
    music_genres: Player[];
    song_moods: Player[];
    best_seasons_to_listen: Player[];
    lyric_styles: Player[];
    duration: string;
    best_times_to_listen: Player[];
    raagams: Player[];
}

export interface Callertune {
    provider: Types;
    url: string;
}

export interface Song {
    id: string;
    title: Language;
    thumbnail: string;
    poster: string;
    type: Types;
    description: Language;
    language: Village;
    item: Item;
    mood: Types;
    lyrics: Lyric[];
    critics: Critic[];
    phonetic_lyrics: Lyric[];
    musics: Music[];
    credit: any;
    info: Info;
    callertunes: Callertune[];
    published_on: string;
    active: boolean;
}

export interface Composers {
    label: Language;
    order: number;
}
export interface Credits {
    composers: Composers;
    lyricists: Composers;
    singers: Composers;
    featuring: Composers;
    sound_engineers: Composers;
    producers: Composers;
    arrangers: Composers;
    masters: Composers;
    recorded_studios: Composers;
    manager_of_visual_content: Composers;
    lyric_video_images: Composers;
    lyric_video_senior_editor: Composers;
    lyric_video_editor: Composers;
    lyric_art: Composers;
    translator: Composers;
}

export interface Infos {
    instruments: Composers;
    raagams: Composers;
    thaalams: Composers;
    music_genres: Composers;
    lyric_genres: Composers;
    lyric_moods: Composers;
    lyric_styles: Composers;
    lyric_languages: Composers;
    best_times_to_listen: Composers;
    best_seasons_to_listen: Composers;
    launch_date: Composers;
    duration: Composers;
}

export interface Entity {
    credit: any;
    info: Infos;
}

export interface DisplayRule {
    entity: Entity;
}

export interface SongCollection {
    song: Song;
    display_rule: DisplayRule;
}
