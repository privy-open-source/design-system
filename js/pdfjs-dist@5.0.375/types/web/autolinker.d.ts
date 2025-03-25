export class Autolinker {
    static "__#73@#index": number;
    static "__#73@#regex": any;
    static findLinks(text: any): {
        url: string;
        index: any;
        length: any;
    }[];
    static processLinks(pdfPageView: any): ({
        borderStyle: null;
        rect: any;
        quadPoints?: undefined;
        id: string;
        unsafeUrl: any;
        url: any;
        annotationType: number;
        rotation: number;
    } | {
        borderStyle: null;
        quadPoints: any[];
        rect: number[];
        id: string;
        unsafeUrl: any;
        url: any;
        annotationType: number;
        rotation: number;
    })[];
}
