function decodeForm(text: string): Record<string, string> {
    const items = text.split('&');
    const ret: Record<string, string> = {};

    items.forEach((item: string) => {
        const [key, value] = item.split('=');

        ret[key] = decodeURIComponent(value);
    });

    return ret;
}

export { decodeForm };