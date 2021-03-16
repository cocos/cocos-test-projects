export function isEmptyObject (obj: any): boolean {
    for (var i in obj) {
        return false;
    }
    return true;
}