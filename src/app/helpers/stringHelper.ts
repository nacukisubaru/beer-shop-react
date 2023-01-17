interface IParam {
    name: string,
    value: any
}

export const removeMask = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
}

export const paramsBuilder = (params: IParam[]): string => {
    var paramsStr: string = '';
    if(params.length) {
        paramsStr += '?';
        var lastParam = params.at(-1);
        params.map((param) => {
            if (Array.isArray(param.value)) {
                var lastParamArray = param.value.at(-1);
                param.value.map((item: string | number) => {
                    paramsStr += param.name + '[]=' + item;
                    if(item !== lastParamArray || (param.value.length === 1 && params.length > 1)) {
                        paramsStr += '&';
                    }
                    return paramsStr;
                });
            } else {
                paramsStr += param.name + '=' + param.value;
                if(param !== lastParam) {
                    paramsStr += '&';
                }
            }
        });
    }

    return paramsStr;
}

export const decodeHtml = (str: string) =>
{
    let result = '';
    var map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };

    if (str) result = str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});

    return result;
}