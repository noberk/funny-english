type Transformat = "text" | "image" | undefined;

export async function takeText(path: string, transformat: Transformat): Promise<string> {

    var myHeaders = new Headers();
    if (transformat === "text") {
        myHeaders.append('Content-Type', 'text/plain');
        var myInit: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        var response = await fetch(path, myInit);
        return await response.text();
    }else{
        return new Promise<string>((resovle) => {
            
        });
    }

}

export async function take<T>(path: string): Promise<T>;
export async function take<T>(path: string, types?: string): Promise<T> {
    if (types !== undefined) {
        var myHeaders = new Headers();
        if (types === "text") {
            myHeaders.append('Content-Type', 'text/plain');
            var myInit: RequestInit = {
                method: 'post',
                mode:"cors",
                cache: 'default',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
            };
            let response = await fetch(path, myInit);
            return await response.json() as Promise<T>
        } else {
            return new Promise<T>((resovle) => {
                     
            });

        }

    } else {
        try {
            let response = await fetch(path);
            return await response.json() as Promise<T>
        } catch (e) {
            return new Promise<T>((resovle) => {
                console.log(e.stack)
            });
        }
    }

}


export class DataUrl {
    static readonly JsSysAPIAddress = './data/JsSysAPI.json';
    static readonly keywordsAddress = './data/JsKeyWords.json';
    static readonly weatcherAddress = './data/weatcher.json';
    static readonly articleAddress = './data/article.json';
    static readonly lession1 = './data/bin/daily/2018年5月11日.cs';
    static readonly abc = './data/bin/daily/abc.json';
}


export async function infiniteTake<T1>(path: string): Promise<{ first: T1 }>;
export async function infiniteTake<T1, T2>(path: string, path2?: string): Promise<{ first: T1, second: T2 }>;
export async function infiniteTake<T1, T2, T3>(path: string, path2?: string, path3?: string): Promise<{ first: T1, second: T2, third: T3 }>
export async function infiniteTake<T1, T2, T3, T4>(path: string, path2?: string, path3?: string, path4?: string): Promise<{ first: T1, second: T2, third: T3, fourth: T4 }>
export async function infiniteTake<T1, T2, T3, T4, T5>(path: string, path2?: string, path3?: string, path4?: string) {
    var response1, response2, response3, response4;
    var t1, t2, t3, t4;
    if (path4 && path3 && path2) {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        response2 = await fetch(path2);
        t2 = await response2.json() as T2;
        response3 = await fetch(path3);
        t3 = await response3.json() as T3;
        response4 = await fetch(path4);
        t4 = await response4.json() as T4;
        return { first: t1, second: t2, third: t3, forth: t4 }
    } else if (path3 && path2) {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        response2 = await fetch(path2);
        t2 = await response2.json() as T2;
        response3 = await fetch(path3);
        t3 = await response3.json() as T3;
        return { first: t1, second: t2, third: t3 }
    }
    else if (path2) {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        response2 = await fetch(path2);
        t2 = await response2.json() as T2;
        return { first: t1, second: t2 }
    } else {
        response1 = await fetch(path);
        t1 = await response1.json() as T1;
        return { first: t1, second: t2 }
    }
}
