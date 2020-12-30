export class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error('No $root provived');
        }
        this.$root = $root;
    }
}
