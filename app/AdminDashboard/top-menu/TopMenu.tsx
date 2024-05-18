'use-client';

import Link from 'next/link'

export const TopMenu = () => {
  return (
    <nav className='flex px-5 justify-between items-centered w-full'>
        <div>
            <Link href='/AdminDashboard'>
                <span>Logo</span>
            </Link>
        </div>
        <div className='hidden sm:block'>
            <Link className='m-2 p-2 rounded-md transition-all' href='/AdminDashboard/Admit'>Aceptar usuarios</Link>
            <Link className='m-2 p-2 rounded-md transition-all' href='/AdminDashboard/AdminUsers'>Administrar Usuarios</Link>
        </div>
        <div className='felx items-center'>
            <Link href='/AdminDashboard'>Cerrar Sesion</Link>
        </div>
    </nav>
  )
}
