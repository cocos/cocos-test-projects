
const fs = require('fs-extra');
const ps = require('path');
const URL = require('url');

const assetsDir = ps.join(__dirname, '..', 'assets');
const glTFOutDir = ps.join(assetsDir, 'cases', 'asset-db', 'model');

(async () => {
    const simpleImageFile = ps.join(__dirname, 'simple-image.jpg');
    const nonExistingImageFileName = '__absent__image__source__.png';
    const simpleImageDataUri = await fs.readFile(ps.join(__dirname, 'simple-image-data-uri'), 'utf-8');

    await generateDirectory({
        'simple-image.jpg': generateCopy(simpleImageFile),

        // No URI
        'glTF-image-no-uri': generateGlTF({
            images: [{ }],
        }),

        // Bad URIs
        'glTF-image-bad-uri': generateGlTF({
            images: [
                { name: 'bad-data-uri', uri: 'data:' },
                { name: 'absolute-file-path-win32', uri: 'C:\\x.jpg' },
                { name: 'absolute-file-path-mix-slash-back-slash', uri: 'C:\\x/y.jpg' },
            ],
        }),

        // Data URI
        'glTF-image-data-uri': generateGlTF({
            images: [{ uri: simpleImageDataUri }],
        }),

        // Relative URI starts with "./", the source exists
        'glTF-image-dot-relative-uri-exists': generateGlTF({
            images: [{ uri: `./simple-image.jpg` }],
        }),
        // Relative URI starts with "./", the source does not exist
        'glTF-image-dot-relative-uri-do-not-exists': generateGlTF({
            images: [{ uri: `./${nonExistingImageFileName}` }],
        }),

        // Bare form relative URI
        'glTF-image-bare-relative-uri-exists': generateGlTF({
            images: [{ uri: `simple-image.jpg` }],
        }),
        // Bare form relative URI
        'glTF-image-bare-relative-uri-do-not-exists': generateGlTF({
            images: [{ uri: `${nonExistingImageFileName}` }],
        }),

        // Absolute file URI, the source exists
        'glTF-image-absolute-file-uri-exists': generateGlTF({
            images: [{ uri: URL.pathToFileURL(ps.join(__dirname, 'simple-image.jpg')) }],
        }),

        // Absolute file URI, the source does not exist
        'glTF-image-absolute-file-uri-do-not-exists': generateGlTF({
            images: [{ uri: URL.pathToFileURL(ps.join(__dirname, nonExistingImageFileName)) }],
        }),

        // Bad absolute URI
    })(glTFOutDir, '.');
})();

function generateDirectory(task) {
    return async (cwd, name) => {
        const dir = ps.join(cwd, name);
        await fs.ensureDir(dir);
        for (const name of Object.keys(task)) {
            const generator = task[name];
            await generator(dir, name);
        }
    };
};

function generateGlTF(glTF) {
    return async (cwd, name) => {
        const path = ps.join(cwd, `${name}.gltf`);
        const outDir = ps.dirname(path);
        await fs.ensureDir(outDir, glTF);
        await fs.writeFile(path, JSON.stringify(glTF, undefined, 4));
    };
};

function generateCopy(file) {
    return async (cwd, name) => {
        const path = ps.join(cwd, `${name}`);
        await fs.copyFile(file, path);
    };
}