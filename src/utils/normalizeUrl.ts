export default (url: string) => url.replace(
    /(^\w+:\/\/)|\/{2,}/g, (_, protocol) => protocol || '/'
).replace(/\/$/, '') || '/';