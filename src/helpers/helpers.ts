export const serializeSearchParams = (searchParams: URLSearchParams) => {
    const params:{[key:string]: string} = {};
    // @ts-ignore
    for(let [key, value] of searchParams) {
        params[key as string] = value
    }
    return params
};