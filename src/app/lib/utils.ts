export function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
};

export function convertToAbsoluteUrl(url: string) {
    if (url.startsWith('//')) {
        return `https:${url}`;
    }
    return url;
}