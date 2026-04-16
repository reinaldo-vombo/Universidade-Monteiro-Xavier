require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Universidade Monteiro Xavier`,
    description: `A Universidade Monteiro Xavier é uma instituição de ensino superior dedicada à excelência académica, inovação e formação de profissionais qualificados em Angola.`,
    siteUrl: `https://www.monteiroxavier.ao`,
    author: {
      name: `Reinaldo Vombo`,
      url: `https://reinaldo-vombo.vercel.app`,
    },
    social: {
      twitter: '@universidademx',
    },
    keyWords: [
      'Universidade Monteiro Xavier',
      'universidade em Angola',
      'ensino superior Angola',
      'faculdades em Luanda',
      'Exame de Acesso',
      'cursos universitários',
      'licenciatura Angola',
      'instituição académica',
      'educação superior',
      'formação profissional',
      'universidade privada Angola',
    ],
    siteImage: `og-image.jpg`,
    category: 'Educação',
    metadataBase: `https://www.monteiroxavier.ao`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/constants/data`,
      },
    },
  ],
};

export default config;
