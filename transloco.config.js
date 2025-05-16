module.exports = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: ['en', 'es', 'nl', 'de', fr],
  keysManager: {},
  /*
  LOADING LIBRARIES EXAMPLE
    scopedLibs: [
      {
        src: 'biit-ui/filter',
        dist: ['./src/assets/i18n/biit-ui/filter']
      }
    ]
*/
  scopedLibs: [
    {
      src: './projects/x-forms-lib',
      dist: ['./src/assets/i18n']
    }
  ]
};
