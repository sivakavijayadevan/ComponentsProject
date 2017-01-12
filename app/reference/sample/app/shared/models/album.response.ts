export interface Title {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Description {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Album {
    id: string;
    slug: string;
    village: string;
    title: Title;
    description: Description;
    thumbnail: string;
}

export interface Data {
    album: Album;
}

export interface Title2 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Description2 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Type {
    id: number;
    name: string;
}

export interface Language {
    code: string;
    name: string;
}

export interface Video {
    link: string;
    alternative_link: string;
}

export interface Lyric {
    link: string;
    alternative_link: string;
}

export interface Audio {
    link: string;
    alternative_link: string;
}

export interface Making {
    link: string;
    alternative_link: string;
}

export interface Karaoke {
    link: string;
    alternative_link: string;
}

export interface Item {
    video: Video;
    lyric: Lyric;
    audio: Audio;
    making: Making;
    karaoke: Karaoke;
}

export interface Mood {
    id: number;
    name: string;
}

export interface Language2 {
    name: string;
    code: string;
}

export interface Lyric2 {
    data: string;
    language: Language2;
}

export interface Name {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Author {
    name: Name;
    image: string;
}

export interface Comment {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Vocal {
    score: number;
    comment: Comment;
}

export interface Comment2 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Instrument {
    score: number;
    comment: Comment2;
}

export interface Comment3 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Overall {
    score: number;
    comment: Comment3;
}

export interface Comment4 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Tune {
    score: number;
    comment: Comment4;
}

export interface Comment5 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Lyric3 {
    score: number;
    comment: Comment5;
}

export interface Review {
    vocal: Vocal;
    instrument: Instrument;
    overall: Overall;
    tune: Tune;
    lyric: Lyric3;
}

export interface Critic {
    rating: number;
    author: Author;
    review: Review;
}

export interface Language3 {
    name: string;
    code: string;
}

export interface PhoneticLyric {
    data: string;
    language: Language3;
}

export interface Name2 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Player {
    name: Name2;
}

export interface Name3 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Instrument2 {
    name: Name3;
}

export interface Music {
    players: Player[];
    instrument: Instrument2;
}

export interface Name4 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Mixer {
    name: Name4;
}

export interface Name5 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Master {
    name: Name5;
}

export interface Name6 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Composer {
    name: Name6;
}

export interface Name7 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Lyricist {
    name: Name7;
}

export interface Name8 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Singer {
    name: Name8;
}

export interface Name9 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Producer {
    name: Name9;
}

export interface Name10 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Arranger {
    name: Name10;
}

export interface Name11 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface RecordedStudio {
    name: Name11;
}

export interface Name12 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface LyricVideoSeniorEditor {
    name: Name12;
}

export interface Name13 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface LyricVideoImage {
    name: Name13;
}

export interface Name14 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface ManagerOfVisualContent {
    name: Name14;
}

export interface Name15 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface SoundEngineer {
    name: Name15;
}

export interface Name16 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface LyricVideoEditor {
    name: Name16;
}

export interface Credit {
    mixers: Mixer[];
    masters: Master[];
    composers: Composer[];
    lyricists: Lyricist[];
    singers: Singer[];
    producers: Producer[];
    arrangers: Arranger[];
    recorded_studios: RecordedStudio[];
    lyric_video_senior_editor: LyricVideoSeniorEditor[];
    lyric_video_images: LyricVideoImage[];
    manager_of_visual_content: ManagerOfVisualContent[];
    sound_engineers: SoundEngineer[];
    lyric_video_editor: LyricVideoEditor[];
}

export interface Name17 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface LyricLanguage {
    name: Name17;
    code: string;
}

export interface Name18 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Instrument3 {
    name: Name18;
}

export interface Name19 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Thaalam {
    name: Name19;
}

export interface Name20 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface LyricGenre {
    name: Name20;
}

export interface Name21 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface MusicGenre {
    name: Name21;
}

export interface Name22 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface SongMood {
    name: Name22;
}

export interface Name23 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface BestSeasonsToListen {
    name: Name23;
}

export interface Name24 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface LyricStyle {
    name: Name24;
}

export interface Name25 {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface BestTimesToListen {
    name: Name25;
}

export interface Info {
    lyric_languages: LyricLanguage[];
    instruments: Instrument3[];
    thaalams: Thaalam[];
    lyric_genres: LyricGenre[];
    music_genres: MusicGenre[];
    song_moods: SongMood[];
    best_seasons_to_listen: BestSeasonsToListen[];
    lyric_styles: LyricStyle[];
    launch_date: string;
    duration: number;
    best_times_to_listen: BestTimesToListen[];
}

export interface Provider {
    id: string;
    name: string;
}

export interface Callertune {
    provider: Provider;
    url: string;
}

export interface Song2 {
    id: string;
    title: Title2;
    slug: string;
    village: string;
    description: Description2;
    type: Type;
    language: Language;
    thumbnail: string;
    poster: string;
    item: Item;
    mood: Mood;
    lyrics: Lyric2[];
    critics: Critic[];
    phonetic_lyrics: PhoneticLyric[];
    musics: Music[];
    credit: Credit;
    info: Info;
    callertunes: Callertune[];
    published_on: Date;
    active: boolean;
}

export interface Label {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Director {
    label: Label;
    order: number;
}

export interface Label2 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface ProgrammedBy {
    label: Label2;
    order: number;
}

export interface Label3 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Featuring {
    label: Label3;
    order: number;
}

export interface Label4 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Masters {
    label: Label4;
    order: number;
}

export interface Label5 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Production {
    label: Label5;
    order: number;
}

export interface Label6 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface DirectorOfPhotography {
    label: Label6;
    order: number;
}

export interface Label7 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Staring {
    label: Label7;
    order: number;
}

export interface Label8 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Audiography {
    label: Label8;
    order: number;
}

export interface Label9 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Colorist {
    label: Label9;
    order: number;
}

export interface Label10 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Lyricists {
    label: Label10;
    order: number;
}

export interface Label11 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface SoundEngineers {
    label: Label11;
    order: number;
}

export interface Label12 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Arrangers {
    label: Label12;
    order: number;
}

export interface Label13 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Musicians {
    label: Label13;
    order: number;
}

export interface Label14 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LightUnit {
    label: Label14;
    order: number;
}

export interface Label15 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface MakingVideoDirectorOfPhotography {
    label: Label15;
    order: number;
}

export interface Label16 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Singers {
    label: Label16;
    order: number;
}

export interface Label17 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricVideoImages {
    label: Label17;
    order: number;
}

export interface Label18 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Rap {
    label: Label18;
    order: number;
}

export interface Label19 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Composers {
    label: Label19;
    order: number;
}

export interface Label20 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface ProgrammerMusicProduction {
    label: Label20;
    order: number;
}

export interface Label21 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricVideoEditedBy {
    label: Label21;
    order: number;
}

export interface Label22 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface AdditionalProgramming {
    label: Label22;
    order: number;
}

export interface Label23 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricVideoSeniorEditor2 {
    label: Label23;
    order: number;
}

export interface Label24 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface RecordedStudios {
    label: Label24;
    order: number;
}

export interface Label25 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricVideoJuniorCameraman {
    label: Label25;
    order: number;
}

export interface Label26 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricVideoEditor2 {
    label: Label26;
    order: number;
}

export interface Label27 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Designs {
    label: Label27;
    order: number;
}

export interface Label28 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface ScoreSupervisor {
    label: Label28;
    order: number;
}

export interface Label29 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface SeniorEditor {
    label: Label29;
    order: number;
}

export interface Label30 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface PrincipalPhotography {
    label: Label30;
    order: number;
}

export interface Label31 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface JuniorCameraman {
    label: Label31;
    order: number;
}

export interface Label32 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Chorus {
    label: Label32;
    order: number;
}

export interface Label33 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface MakingVideoLightUnit {
    label: Label33;
    order: number;
}

export interface Label34 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricArt {
    label: Label34;
    order: number;
}

export interface Label35 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface ManagerOrCoOrdinator {
    label: Label35;
    order: number;
}

export interface Label36 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Producers {
    label: Label36;
    order: number;
}

export interface Label37 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface ManagerOfVisualContent2 {
    label: Label37;
    order: number;
}

export interface Label38 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Editing {
    label: Label38;
    order: number;
}

export interface Label39 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface DirectorOfCinematography {
    label: Label39;
    order: number;
}

export interface Label40 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Mixers {
    label: Label40;
    order: number;
}

export interface Label41 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Editor {
    label: Label41;
    order: number;
}

export interface Label42 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface VideoEditor {
    label: Label42;
    order: number;
}

export interface Label43 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface SanskritSupervision {
    label: Label43;
    order: number;
}

export interface Label44 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Translator {
    label: Label44;
    order: number;
}

export interface Label45 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface EditingAndMotionDesign {
    label: Label45;
    order: number;
}

export interface Credit2 {
    director: Director;
    programmed_by: ProgrammedBy;
    featuring: Featuring;
    masters: Masters;
    production: Production;
    director_of_photography: DirectorOfPhotography;
    staring: Staring;
    audiography: Audiography;
    colorist: Colorist;
    lyricists: Lyricists;
    sound_engineers: SoundEngineers;
    arrangers: Arrangers;
    musicians: Musicians;
    light_unit: LightUnit;
    "making-video-director-of-photography": MakingVideoDirectorOfPhotography;
    singers: Singers;
    lyric_video_images: LyricVideoImages;
    rap: Rap;
    composers: Composers;
    programmer_music_production: ProgrammerMusicProduction;
    lyric_video_edited_by: LyricVideoEditedBy;
    additional_programming: AdditionalProgramming;
    lyric_video_senior_editor: LyricVideoSeniorEditor2;
    recorded_studios: RecordedStudios;
    lyric_video_junior_cameraman: LyricVideoJuniorCameraman;
    lyric_video_editor: LyricVideoEditor2;
    designs: Designs;
    score_supervisor: ScoreSupervisor;
    senior_editor: SeniorEditor;
    "principal-photography": PrincipalPhotography;
    junior_cameraman: JuniorCameraman;
    chorus: Chorus;
    making_video_light_unit: MakingVideoLightUnit;
    lyric_art: LyricArt;
    manager_or_co_ordinator: ManagerOrCoOrdinator;
    producers: Producers;
    manager_of_visual_content: ManagerOfVisualContent2;
    editing: Editing;
    director_of_cinematography: DirectorOfCinematography;
    mixers: Mixers;
    editor: Editor;
    video_editor: VideoEditor;
    sanskrit_supervision: SanskritSupervision;
    translator: Translator;
    editing_and_motion_design: EditingAndMotionDesign;
}

export interface Label46 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Thaalams {
    label: Label46;
    order: number;
}

export interface Label47 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Duration {
    label: Label47;
    order: number;
}

export interface Label48 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricLanguages {
    label: Label48;
    order: number;
}

export interface Label49 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface SongTitle {
    label: Label49;
    order: number;
}

export interface Label50 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface SongDescription {
    label: Label50;
    order: number;
}

export interface Label51 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Raagams {
    label: Label51;
    order: number;
}

export interface Label52 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricMoods {
    label: Label52;
    order: number;
}

export interface Label53 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface Instruments {
    label: Label53;
    order: number;
}

export interface Label54 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface MusicGenres {
    label: Label54;
    order: number;
}

export interface Label55 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricStyles {
    label: Label55;
    order: number;
}

export interface Label56 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LyricGenres {
    label: Label56;
    order: number;
}

export interface Label57 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface BestSeasonsToListen2 {
    label: Label57;
    order: number;
}

export interface Label58 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface AlbumTitle {
    label: Label58;
    order: number;
}

export interface Label59 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface LaunchDate {
    label: Label59;
    order: number;
}

export interface Label60 {
    hi: string;
    te: string;
    en: string;
    ta: string;
}

export interface BestTimesToListen2 {
    label: Label60;
    order: number;
}

export interface Info2 {
    thaalams: Thaalams;
    duration: Duration;
    lyric_languages: LyricLanguages;
    song_title: SongTitle;
    song_description: SongDescription;
    raagams: Raagams;
    lyric_moods: LyricMoods;
    instruments: Instruments;
    music_genres: MusicGenres;
    lyric_styles: LyricStyles;
    lyric_genres: LyricGenres;
    best_seasons_to_listen: BestSeasonsToListen2;
    album_title: AlbumTitle;
    launch_date: LaunchDate;
    best_times_to_listen: BestTimesToListen2;
}

export interface Entity {
    credit: Credit2;
    info: Info2;
}

export interface DisplayRule {
    entity: Entity;
}

export interface Data2 {
    song: Song2;
    display_rule: DisplayRule;
}

export interface Song {
    id: string;
    album_id: string;
    song_title: string;
    data: Data2;
    published?: any;
    published_status: number;
    created_date: Date;
    updated_date: Date;
    created_by: number;
    updated_by: number;
    status: number;
}

export interface Datum {
    id: string;
    title: string;
    data: Data;
    published?: any;
    published_status: number;
    created_date: Date;
    updated_date: Date;
    created_by: number;
    updated_by: number;
    status: boolean;
    songs: Song[];
    songOpen: boolean; 
}

export interface RootObject {
    errorStatus: boolean;
    data: Datum[];
    error?: any;
}


