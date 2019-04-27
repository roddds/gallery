/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");

async function getFileNames(graphql) {
  const files = await graphql(`
    query {
      allFile(filter: { relativeDirectory: { glob: "photos/**" } }) {
        edges {
          node {
            relativeDirectory
            relativePath
            publicURL
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    return result;
  });

  return files.data.allFile.edges;
}

async function getAlbums(graphql) {
  const directories = await graphql(`
    query {
      allFile(filter: { relativeDirectory: { glob: "photos/*" } }) {
        edges {
          node {
            relativeDirectory
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    return result.data.allFile.edges.map(f => {
      const filename = f.node.relativeDirectory.replace("photos/", "");
      if (filename.indexOf(" ") !== -1) {
        throw Error(`Do not use spaces in album directories: "${filename}"`);
      }
      return filename;
    });
  });

  return Array.from(new Set(directories));
}

async function getMiniatures(graphql, paths, albums) {
  const miniatures = {};
  albums.forEach(a => (miniatures[a] = []));

  paths.forEach(async path => {
    const album = path.split("/", 2)[1];
    const miniature = await graphql(
      `
        query SmallImage($path: String) {
          file(relativePath: { eq: $path }) {
            childImageSharp {
              fluid(maxWidth: 200, quality: 75) {
                src
              }
            }
          }
        }
      `,
      { path }
    ).then(result => {
      if (result.errors) {
        throw result.errors;
      }

      miniatures[album].push(result.data.file.childImageSharp.fluid.src);
    });
  });

  return miniatures;
}

async function getFullSizedImages(graphql, paths, albums) {
  const fullSized = {};
  albums.forEach(a => (fullSized[a] = []));

  paths.forEach(async path => {
    const album = path.split("/", 2)[1];
    const miniature = await graphql(
      `
        query SmallImage($path: String) {
          file(relativePath: { eq: $path }) {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                src
              }
            }
          }
        }
      `,
      { path }
    ).then(result => {
      if (result.errors) {
        throw result.errors;
      }

      fullSized[album].push(result.data.file.childImageSharp.fluid.src);
    });
  });

  return fullSized;
}

async function createPages({ graphql, actions }) {
  const ListTemplate = path.resolve("./src/templates/list.js");
  const AlbumTemplate = path.resolve("./src/templates/album.js");

  // get all files
  // { publicUrl, relativeDirectory }
  const files = await getFileNames(graphql);
  const paths = files.map(f => f.node.relativePath);
  const albums = await getAlbums(graphql);

  const miniatures = await getMiniatures(graphql, paths, albums);
  const fullSized = await getFullSizedImages(graphql, paths, albums);

  actions.createPage({
    path: `/`,
    component: ListTemplate,
    context: {
      albums: albums,
      allPhotos: miniatures,
    },
  });

  albums.forEach(album => {
    actions.createPage({
      path: album,
      component: AlbumTemplate,
      context: {
        name: album,
        photos: fullSized[album],
      },
    });
  });
}

exports.createPages = createPages;
