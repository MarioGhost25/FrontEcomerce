

export const CategorySkeletonList = ({ numberOfSkeletons = 3 }) => {
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <li key={index} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse">
                    {/* Simulación de la capa de gradiente inferior */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent dark:from-gray-700/50" />
                    {/* Simulación del contenido de texto abajo */}
                    <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 space-y-3">
                        {/* Simulación del Título (h3) */}
                        <div className="h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                        {/* Simulación del link "Explorar" */}
                        <div className="h-4 w-1/4 rounded-md bg-gray-200/60 dark:bg-gray-700/60" />
                    </div>
                </li>
            ))}
        </ul>
    )
}
