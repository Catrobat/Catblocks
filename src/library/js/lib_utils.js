/**
 * Prepares all paths given in config
 */
export function preparePaths(catblocks_instance) {
  catblocks_instance.config.shareRoot = addTrailingSlash(catblocks_instance.config.shareRoot);
  catblocks_instance.config.shareRoot = catblocks_instance.config.shareRoot.replace(/^\//, '');

  catblocks_instance.config.media = addTrailingSlash(catblocks_instance.config.media);
  catblocks_instance.config.i18n = addTrailingSlash(catblocks_instance.config.i18n);

  catblocks_instance.config.media = createURL(catblocks_instance, catblocks_instance.config.media);
  catblocks_instance.config.i18n = createURL(catblocks_instance, catblocks_instance.config.i18n);

  if (!catblocks_instance.config.shareRoot.startsWith('http')) {
    catblocks_instance.config.shareRoot = '/' + catblocks_instance.config.shareRoot;
  }
}

/**
 * Create URL
 * @param {*} path
 * @returns
 */
function createURL(catblocks_instance, path) {
  if (path.startsWith('http')) {
    return path;
  }
  if (path.startsWith('/')) {
    return window.location.origin + path;
  }

  if (catblocks_instance.config.shareRoot.startsWith('http')) {
    return catblocks_instance.config.shareRoot + path;
  }
  return window.location.origin + '/' + catblocks_instance.config.shareRoot + path;
}

/**
 * Be sure there is a trailing slash. Only one.
 * @param {*} string
 * @returns
 */
function addTrailingSlash(string) {
  if (!string) {
    return '';
  }
  if (!string.endsWith('/')) {
    return string + '/';
  }
  return string;
}
