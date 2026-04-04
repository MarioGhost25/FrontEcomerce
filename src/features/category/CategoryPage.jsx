import Navbar from '../../components/layout/Navbar'
import { useGetAllCategoriesQuery } from '../../api/endpoints/categoryApi'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { CategorySkeletonList } from './components/CategorySkeletonList'

export const CategoryPage = () => {
    const { data: categories = [], isLoading, isError, error } = useGetAllCategoriesQuery()

    const errorMessage =
        typeof error?.data === 'string'
            ? error.data
            : error?.data?.message || error?.error || 'No se pudieron cargar las categorias.'


    return (
        <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden '>
            <Navbar />
            <main className='flex-1'>
                <section className='py-10 bg-accent-light/30'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-12'>
                        <div className='mb-8 text-center'>{/* Podria ser un Header */}
                            <h1 className='text-3xl text-black font-black tracking-tight  sm:text-4xl'>
                                Categorias
                            </h1>
                            <p className='mt-2 text-sm text-text-muted sm:text-base'>
                                Explora nuestras colecciones por categoria.
                            </p>
                        </div>

                        {isLoading && <CategorySkeletonList numberOfSkeletons={6} />}

                        {isError && (
                            <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300'>
                                {errorMessage}
                            </div>
                        )}

                        {!isLoading && !isError && categories.length === 0 && (
                            <div className='rounded-xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300'>
                                No hay categorias disponibles en este momento.
                            </div>
                        )}

                        {!isLoading && !isError && categories.length > 0 && (
                            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                                {categories.map((category) => {
                                    const categoryId = category.id ?? category._id
                                    const categoryHref = categoryId ? `/categories/${categoryId}` : '/categories'

                                    return (
                                        <Link
                                            key={categoryId ?? category.name}
                                            className='group relative overflow-hidden rounded-xl aspect-[4/5] shadow-md'
                                            to={categoryHref}
                                        >
                                            <div
                                                className='absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110'
                                                style={{
                                                    backgroundImage: category.image
                                                        ? `url(${category.image})`
                                                        : 'linear-gradient(135deg, #134e4a, #0d9488)',
                                                }}
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
                                            <div className='absolute bottom-0 left-0 w-full p-4 sm:p-5'>
                                                <h3 className='text-white text-xl font-bold mb-1'>
                                                    {category.name}
                                                </h3>
                                                <div className='flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0'>
                                                    Explorar <ArrowRight className='ml-1 size-4' strokeWidth={2.2} />
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}
