


export const ProductSlekeletonList = ({ numberOfSkeletons = 3 }) => {
  return (
    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: numberOfSkeletons }, (_, index) => (
            <li key={index} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse">
                
            </li>
        ))}
    </ul>
  )
}
