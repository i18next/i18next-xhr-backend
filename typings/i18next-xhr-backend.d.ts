// declare module 'i18next-xhr-backend' {
//     export class Backend {
//         type: any;
//         services: any;
//         options: any;
//         constructor(services: any, options?: {});
//         init(services: any, options?: {}): void;
//         readMulti(languages: any, namespaces: any, callback: any): void;
//         read(language: any, namespace: any, callback: any): void;
//         loadUrl(url: any, callback: any): void;
//         create(languages: any, namespace: any, key: any, fallbackValue: any): void;
//     }
//
// }
declare module 'i18next-xhr-backend' {

    interface Interpolator {
        interpolate: () => string
    }
    interface Services {
        interpolator: Interpolator
    }
    export default class Backend {
        type: 'backend';
        services: Services;
        options: {
            loadPath: string,
            addPath:  string,
            allowMultiLoading: boolean,
            parse: () => {},
            crossDomain: boolean,
            ajax: () => void
        };
        constructor(services: Services, options?: {});
        init(services: Services, options?: {}): void;
        readMulti(languages: any[], namespaces: any[], callback: () => void): void;
        read(language: {}, namespace: {}, callback: () => void): void;
        loadUrl(url: string, callback: () => void): void;
        create(languages: any[], namespace: string, key: string, fallbackValue: string): void;
    }
}
