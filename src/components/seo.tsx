import { graphql, useStaticQuery } from "gatsby"
import React from "react"
type SEOProps = {
   title?: string
   description?: string
   pathname?: string
   keyWords?: string[]
   article?: boolean

}

export const SEO = ({ title, description, keyWords, pathname, article }: SEOProps) => {
   const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          keyWords 
          description
          social {
            twitter
         }
          siteUrl
          siteImage
          author {
            name
          }
        }
      }
    }
  `)
   const meta = site.siteMetadata;

   const seo = {
      title: `${title || ''} - ${meta.title}`,
      description: description || meta.description,
      image: `${process.env.GATSBY_APP_BASE_URL}${meta.siteImage}`,
      url: `${meta.siteUrl}${pathname || ``}`,
      twitterUsername: meta.social.twitter,
   }
   const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: meta.title,
      url: meta.siteUrl,
      logo: meta.siteImage,
      description: meta.description,
      address: {
         "@type": "PostalAddress",
         addressLocality: "Luanda",
         addressCountry: "AO",
      },
      sameAs: [
         "https://www.facebook.com/",
         "https://www.linkedin.com/",
         "https://www.instagram.com/"
      ]
   }

   const articleData = article
      ? {
         "@context": "https://schema.org",
         "@type": "Article",
         headline: seo.title,
         description: seo.description,
         image: seo.image,
         author: {
            "@type": "Person",
            name: meta.author.name,
         },
         publisher: {
            "@type": "Organization",
            name: meta.title,
            logo: {
               "@type": "ImageObject",
               url: meta.siteImage,
            },
         },
         mainEntityOfPage: seo.url,
      }
      : null

   return (
      <>
         <title>{seo.title}</title>
         <meta name="description" content={seo.description} />
         <meta name="og:description" content={seo.description} />
         <meta name="url" content={seo.url} />
         <meta name="identifier-UR" content={seo.url} />
         <meta name="keywords" content={meta.keywords?.join(", ")} />
         <meta name="author" content={meta.author.name} />
         <meta name="og:title" content={seo.title} />
         <meta property="og:image" content={seo.image} />
         <meta name="og:type" content="website" />
         <meta property="og:image:width" content="1200" />
         <meta property="og:image:width" content="630" />
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={seo.title} />
         <meta name="twitter:url" content={seo.url} />
         <meta name="twitter:description" content={seo.description} />
         <meta name="twitter:image" content={seo.image} />
         <meta name="twitter:creator" content={seo.twitterUsername} />
         <meta name="copyright" content="braline" />
         <meta name="robots" content="index,follow" />
         <link rel="icon" href='/favicon.ico' />
         <script type="application/ld+json">
            {JSON.stringify(structuredData)}
         </script>
         {articleData && (
            <script type="application/ld+json">
               {JSON.stringify(articleData)}
            </script>
         )}
         {/* <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
         <link rel="android-chrome" sizes="192x192" href="/favicon_io/android-chrome-192x192.png" /> */}
         {/* {children} */}
      </>
   )
}