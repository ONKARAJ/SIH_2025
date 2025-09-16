import { getCityBySlug } from '@/lib/cities-data'
import { CityPageTemplate } from '@/components/city-page-template'
import { notFound } from 'next/navigation'

export default function DhanbadPage() {
  const city = getCityBySlug('dhanbad')
  
  if (!city) {
    notFound()
  }

  return <CityPageTemplate city={city} />
}

export async function generateMetadata() {
  const city = getCityBySlug('dhanbad')
  
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
