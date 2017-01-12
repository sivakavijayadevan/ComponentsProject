import { Types } from '../../shared/models/song';

export interface Language {
    en: string;
    ta: string;
    hi: string;
    te: string;
}

export interface Village {
    code: string;
    name: string;
}

export interface Album {
    id: string;
    language: Village;
    title: Language;
    description: Language;
    thumbnail: string;
    type: Types,
    active: boolean
}

export interface AlbumCollection {
    album: Album;
}

export class AlbumPagingParam {
    offset: number;
    limit: number;
    sorted_by: string;
    sorted_order: string;
    title: string;
    published_status: number;
}