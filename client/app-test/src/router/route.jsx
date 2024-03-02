import { createBrowserRouter, redirect } from 'react-router-dom';
import { Login } from '../views/login';
import { Home } from '../views/home';
import { Register } from '../views/register';
import 'react-toastify/dist/ReactToastify.css';
import { AddDataForm } from '../views/add-biodata';
import { DetailBiodata } from '../views/detail-biodata';
import { EditDataForm } from '../views/edit-biodata';
import { AddEducationForm } from '../views/add-education';
import { EditEducationForm } from '../views/edit-education';
import { AddTrainingForm } from '../views/add-training';
import { EditTrainingForm } from '../views/edit-training';
import { AddWorkForm } from '../views/add-work';
import { EditWorkForm } from '../views/edit-work';

const router = createBrowserRouter([
  {
    loader: () => {
      return redirect('/login');
    },
    path: '/',
  },
  {
    loader: () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        return redirect('/home');
      }
      return null;
    },
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    loader: () => {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        return redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/add-biodata',
        element: <AddDataForm/>,
      },
      {
        path: '/detail-biodata/:id',
        element: <DetailBiodata/>,
      },
      {
        path: '/edit-biodata/:id',
        element: <EditDataForm/>,
      },
      {
        path: '/add-education/:id',
        element: <AddEducationForm/>,
      },
      {
        path: '/edit-education/:id',
        element: <EditEducationForm/>,
      },
      {
        path: '/add-training/:id',
        element: <AddTrainingForm/>,
      },
      {
        path: '/edit-training/:id',
        element: <EditTrainingForm/>,
      },
      {
        path: '/add-work/:id',
        element: <AddWorkForm/>,
      },
      {
        path: '/edit-work/:id',
        element: <EditWorkForm/>,
      },
    ],
  },
]);

export default router;
