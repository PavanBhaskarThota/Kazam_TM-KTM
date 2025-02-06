import { Link } from "react-router"

export const NavBar = () => {
  return (
    <div className="flex justify-between items-center w-full h-[60px] px-[30px] border-b-[0.5px] mb-5">
      <div className="flex gap-4 items-center">
      <h1 className="text-2xl font-bold">KTM</h1>
      <a href="">Home</a>
      </div>
      <div>
        <ul className="flex gap-4">
          <li>
            <Link to={'/'}>Login</Link>
          </li>
          <li>
            <a href="">Sign Up</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
