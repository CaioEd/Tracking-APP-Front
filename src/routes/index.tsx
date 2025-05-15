import { 
    BrowserRouter, 
    Route, 
    Routes
} from 'react-router-dom'

import { PrivateRoutes } from '@/routes/privateRoutes'  

import Home from '@/screens/home'

import { SignIn } from '@/screens/signin'
import { CreateNewRoute } from '@/screens/new-route/page'
import { Unauthorized } from '@/screens/unauthorized'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/new-route' element={
                    <CreateNewRoute />
                }
                />
         
                {/* <Route path='/users' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <ListUsers />
                    </PrivateRoutes>
                    } 
                />

                <Route path='/users/add' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <AddUsers />
                    </PrivateRoutes>
                    } 
                />
                
                <Route path='/users/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <EditUser />
                    </PrivateRoutes>
                    } 
                /> */}
                            
            </Routes>
        </BrowserRouter>
    )
}
