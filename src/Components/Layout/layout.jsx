
import { Outlet } from 'react-router-dom'
import Navpar from '../Navpar/Navpar'

export default function layout() {
  return (
    <>
    <Navpar/>
      <div className=" mt-16">
        <div className="mt-16">
        <Outlet/>
        </div>
    
      </div>
    </>
  )
}
