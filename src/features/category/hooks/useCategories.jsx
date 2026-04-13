import { useGetAllCategoriesQuery } from '../../../api/endpoints/categoryApi'

export const useCategories = () => {
    const { data: categories = [], isLoading, isError, error } = useGetAllCategoriesQuery()

    const errorMessage =
        typeof error?.data === 'string'
            ? error.data
            : error?.data?.message || error?.error || 'No se pudieron cargar las categorias.'

    return {
        categories,
        isLoading, 
        isError,
        errorMessage
    }

}
