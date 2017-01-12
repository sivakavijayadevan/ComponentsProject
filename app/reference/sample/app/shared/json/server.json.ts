export class ServerJson {

    public aws: string = "aws";
    public ventuno: string = "ventuno";
    public akamai: string = "akamai";

    constructor() {
    }

    public getServerArray() {
        return [this.aws, this.ventuno, this.akamai];
    }

    public getServerObj(): any {
        return {
            "aws": "",
            "ventuno": "",
            "akamai": ""
        };
    }
}