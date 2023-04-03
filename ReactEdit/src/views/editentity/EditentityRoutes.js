import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const EditentityList = Loadable(lazy(() => import('./EditentityList')))
const EditEditentity = Loadable(lazy(() => import('./EditEditentity')))
const AddEditentity = Loadable(lazy(() => import('./AddEditentity')))

const editentityRoutes = [
    {
        path: '/editentity',
        element: <EditentityList />,
    },
    {
        path: '/editentity/edit/:id',
        element: <EditEditentity />,
    },
    {
        path: '/editentity/add',
        element: <AddEditentity />,
    },
]

export default editentityRoutes
