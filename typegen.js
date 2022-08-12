const storyblokToTypescript = require('storyblok-generate-ts');

storyblokToTypescript({
  componentsJson: require('./components.170629.json'),
  path: __dirname + '/app/storyblok/storyblok.d.ts',
});
