import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Auth hooks
export const useAuth = () => {
    const auth = useAppSelector((state) => state.auth)

    const isAdmin = auth.user?.role === 'admin'
    const isTourist = auth.user?.role === 'tourist'

    return {
        ...auth,
        isAdmin,
        isTourist,
    }
}

// Travel Plan hooks
export const useTravelPlan = () => {
    const travelPlanState = useAppSelector((state) => state.travelPlan)

    return {
        ...travelPlanState,
        travelPlan: travelPlanState.currentPlan,
        hasPlans: travelPlanState.plans.length > 0,
    }
}
