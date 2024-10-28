import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { ContainerStore } from '~/types/store'

const useAppSelector: TypedUseSelectorHook<ContainerStore> = useSelector

export default useAppSelector
