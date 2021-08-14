const fs = require('fs');
const path = require('path');
const { outdent } = require('outdent');
const markdown = require('./markdown');
const {format, formatISO} = require('date-fns');
const { compress } = require('compress-images/promise')
const sharp = require('sharp')
const Image = require('@11ty/eleventy-img')

const iconDefaultSize = 24;
const defaultSizes = '90vw';
const defaultImagesSizes = [1920, 1280, 640, 320];

const isFullUrl = (url) => {
  try {
    return !!new URL(url);
  } catch {
    return false;
  }
};

const manifestPath = path.resolve(__dirname, '../dist/assets/manifest.json');

const compressOptions = (source, destination) => ({
  source,
  destination,
  enginesSetup: {
    jpg: { engine: 'mozjpeg', command: [
      // probably a decent quality
      '-quality', '75', 
      '-progressive', '-optimize'
    ] },
    gif: { engine: 'gifsicle', command: ['-O2'] }, // optimization level 2
    png: { engine: 'pngcrush', command: [] }
  }
})

const getMetadata = (path) => sharp(path).metadata()

module.exports = {
  // Allow embedding markdown in `.njk` files
  // {% markdown %}
  // # Heading
  // {% endmarkdown %}
  markdown: (content) => markdown.render(outdent.string(content)),

  // dates for posts
  date: (date) =>
    `<time class="dt-published" datetime="${formatISO(date)}">
      ${format(date, "'the' eo 'of' MMMM, yyyy 'at' h:m B")}
    </time>`,

  unifont: (content) => `<span class="unifont">${content}</span>`,

  // Allow embedding webpack assets pulled out from `manifest.json`
  // {% webpack "main.css" %}
  webpack: async (name) =>
    new Promise((resolve) => {
      fs.readFile(manifestPath, { encoding: 'utf8' }, (err, data) =>
        resolve(err ? `/assets/${name}` : JSON.parse(data)[name])
      );
    }),

  // Allow embedding svg icon
  // {% icon "github.svg", "my-class", [24, 24] %}
  icon: (name, className, size = iconDefaultSize) => {
    if (!Array.isArray(size)) size = [size];
    return outdent({ newline: '' })`
    <svg class="icon icon--${name} ${
      className || ''
    }" role="img" aria-hidden="true" width="${size[0]}" height="${
      size[1] || size[0]
    }">
      <use xlink:href="/assets/images/sprite.svg#${name}"></use>
    </svg>`;
  },
  // Allow embedding responsive images
  // {% image "image.jpeg", "Image alt", "Image title", "my-class" %}
  // {% image [100,100], "image.jpeg", "Image alt", "Image title", "my-class" %}
  image: async (...args) => {
    let fallbackWidth, fallbackHeight;

    if (Array.isArray(args[0])) {
      [fallbackWidth, fallbackHeight] = args.shift();
    }

    const src = args[0];
    const alt = args[1];
    const title = args[2];
    const className = args[3];
    const lazy = args[4] ?? true;
    const sizes = args[5] ?? defaultSizes;

    const extension = path.extname(src).slice(1).toLowerCase();
    // Quick gif passthrough - eleventy-img makes them static otherwise
    if(extension === 'gif') {
    
    }
    const fullSrc = isFullUrl(src) ? src : `./src/assets/images/${src}`;

    const metadata = getMetadata(fullSrc)

    let stats;
    try {
      stats = await Image(fullSrc, {
        widths: [metadata.width, metadata.width / 2],
        formats: extension,
        urlPath: '/assets/images/',
        outputDir: 'dist/assets/images/'
      });
    } catch (e) {
      console.log('\n\x1b[31mERROR\x1b[0m creating image:');
      console.log(`> (${fullSrc})`);
      console.log(`  ${e}\n`);
      return '';
    }

    const fallback = stats[extension].reverse()[0];
    const picture = outdent({ newline: '' })`
    <picture>
      ${Object.values(stats)
        .map(
          (image) =>
            `<source type="image/${image[0].format}" srcset="${image
              .map((entry) => `${entry.url} ${entry.width}w`)
              .join(', ')}" sizes="${sizes}">`
        )
        .join('')}
      <img
        class="${className ? `img-${className}` : ''}"
        loading="${lazy ? 'lazy' : 'eager'}"
        src="${fallback.url}"
        width="${fallbackWidth ?? fallback.width}"
        height="${fallbackHeight ?? fallback.height}" 
        alt="${alt}"
        title="${alt}"
        >
    </picture>`;
    return title
      ? outdent({ newline: '' })`
      <figure class="${className ? `fig-${className}` : ''}">
        ${picture}
        <figcaption>${markdown.renderInline(title)}</figcaption>
      </figure>`
      : picture;
  }
  /*
  // optimizes images
  // TODO: it should probably also add a half-size version w srcset
  // sharp can resize that
  // {% image "image.jpeg", "Image alt", "img-class", "Image title" %}
  image: async (filename, alt="", className="", title="") => {
    const filepath = isFullUrl(filename)
      ? filename
      : `./src/assets/images/${filename}`
    const filetype = path.extname(filepath).slice(1).toLowerCase()

    const src = filepath
    const dist = path.dirname(filepath.replace('src', 'dist')) + path.sep

    console.log(`Compressing ${src} to ${dist}...`)
    const result = await compress(compressOptions(src, dist))
    const { statistics, errors } = result

    if(errors) {
      errors.forEach(console.error)
      return ''
    } else {
      const { size_in, size_output, percent } = statistics[0]
      console.log(
        `Compressed ${src} (${size_in}) to ${dist} (${size_output}), a ${percent} reduction`
      )
    }
    const newFilePath = statistics[0].path_out_new

    const webPath = '/assets' + newFilePath.split('/assets')[1]

    const metadata = getMetadata(newFilePath)

    return 'aabbaba'

    return outdent`
      <img 
        src="${webPath}"
        width="${metadata.width}"
        height="${metadata.height}"
        alt="${alt}"
        title="${title || alt}"
        class="${className}"
      >
      `
  }
  */
};
