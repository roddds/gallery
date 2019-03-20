# Gallery 📷

A static site site generator for photo galleries.

## How to use

- Install gatsby globally (`npm install --global gatsby-cli`)
- Clone the repository
- From inside the repository, run `yarn` (or `npm install`)
- Add your photos to the `src/images/photos/` directory. The directory names
  will be used as the album titles.
- Run `gatsby build`. Your files will be in the `public/` directory. Copy those
  to your static website host.

## Deploying

(this section adapted from [here](https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront/))

### Set up AWS CLI

Create a IAM account with administration permissions and create a access id and
secret for it. You’ll need these in the next step.

Install the AWS CLI and configure it (ensure python is installed before running these commands)

```bash
pip install awscli
aws configure
```

The AWS CLI will now prompt you for the key & secret, add them.

### Set up S3

Let’s add hosting & make the site live on AWS. First, we’ll install the Gatsby
S3 plugin:

```bash
yarn add gatsby-plugin-s3
```

Add it to your `gatsby-config.js`:

```js
plugins: [
  {
    resolve: `gatsby-plugin-s3`,
  },
];
```

And finally, add the deployment script to your `package.json`:

```js
"scripts": {
   ...
   "deploy": "gatsby-plugin-s3 deploy"
}
```

Now run:

```bash
yarn build
yarn deploy -- -b your-bucket-name
```
