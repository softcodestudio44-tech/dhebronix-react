import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteName = 'DHEBRONIX Multimedia Company'
  const defaultDescription = 'Professional sound engineering & multimedia company in Lagos, Nigeria. Live event setup, equipment sales, studio recording.'
  const defaultImage = 'https://dhebronixmc.top/images/logo.png'
  const defaultUrl = 'https://dhebronixmc.top'
  const canonicalUrl = url || defaultUrl

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Organization',
    name: siteName,
    url: canonicalUrl,
    logo: 'https://dhebronixmc.top/images/logo.png',
    description: description || defaultDescription,
    image: image || defaultImage,
    ...(type === 'article' ? {
      headline: title,
      datePublished: new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: siteName
      }
    } : {
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG'
      },
      telephone: '+234-803-728-0457',
      email: 'dhebronixmultimedia@gmail.com',
      sameAs: [
        'https://www.facebook.com/profile.php?id=100091654633566',
        'https://www.instagram.com/dhebronixmc',
        'https://youtube.com/@dhebronixmultimedia935'
      ]
    })
  }

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_NG" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dhebronixmc" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  )
}

export default SEO