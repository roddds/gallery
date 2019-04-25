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

Make a copy of the example `.env.example` file to create the production environment `.env`:

```bash
cp .env.example .env.production
```

Add your AWS credentials and the name of the bucket you'll be going to use to `.env.production`.

### Send your files to S3

Run:

```bash
yarn deploy
```
