export interface LangInput {
    type: string;
    placeholder: string;
}

export interface LangInputLable {
    lbltext: string;
    lblvisible: boolean;
}

export interface LangInputObject {
    lblOptions: LangInputLable;
    inputOptions: LangInput[];
}