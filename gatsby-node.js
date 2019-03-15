/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");

async function createPages({ graphql, actions }) {
  const { createPage } = actions;
  const photoTemplate = path.resolve("./src/templates/photo.js");
  const albumTemplate = path.resolve("./src/templates/album.js");
  const listTemplate = path.resolve("./src/templates/list.js");

  await graphql(`
    {
      allFile(filter: { relativeDirectory: { glob: "photos/**" } }) {
        edges {
          node {
            relativeDirectory
            publicURL
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const albums = new Set();
    const photos = {};

    // create album photo detail views
    result.data.allFile.edges.forEach((edge, index) => {
      const photoNode = edge.node;
      const album = photoNode.relativeDirectory.replace("photos/", "album/");
      albums.add(album);

      if (!photos[album]) {
        photos[album] = [];
      }

      const photo = {
        source: photoNode.publicURL,
        index: index,
        album: album,
      };

      photos[album].push(photo);
    });

    const albumArray = Array.from(albums);

    albumArray.forEach(album => {
      createPage({
        path: album,
        component: albumTemplate,
        context: {
          name: album,
          photos: photos[album],
        },
      });

      photos[album].forEach((photo, index) => {
        createPage({
          path: `/${album}/${index}/`,
          component: photoTemplate,
          context: photo,
        });
      });
    });

    // create album list
    createPage({
      path: `/`,
      component: listTemplate,
      context: {
        albums: albumArray,
        allPhotos: photos,
      },
    });
  });
}

exports.createPages = createPages;
