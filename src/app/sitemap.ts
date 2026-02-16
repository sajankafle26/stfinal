import { MetadataRoute } from 'next'
import { COURSES } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sangalotech.com.np'

    // Static routes
    const routes = ['', '/about', '/services', '/courses', '/upcoming', '/products'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: route === '' ? 1 : 0.8,
        })
    )

    // Dynamic course routes
    const courseRoutes = COURSES.map((course) => ({
        url: `${baseUrl}/courses/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...courseRoutes]
}
