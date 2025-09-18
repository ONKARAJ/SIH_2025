import { getCityBySlug } from '@/lib/cities-data'
import { CityPageTemplate } from '@/components/city-page-template'
import { notFound } from 'next/navigation'

export default function JamshedpurPage() {
  const city = getCityBySlug('jamshedpur')
  
  if (!city) {
    notFound()
  }

  return <CityPageTemplate city={city} />
}

export async function generateMetadata() {
  const city = getCityBySlug('jamshedpur')
  
  if (!city) {
    return {
      title: 'City Not Found',
    }
  }

  return {
    title: `${city.name} - ${city.description} | Jharkhand Tourism`,
    description: city.longDescription,
    keywords: `${city.name}, Jharkhand, tourism, ${city.specialties.join(', ')}, ${city.highlights.join(', ')}`,
  }
}
