import Nav from "components/Nav"
// import SkyBox from "components/SkyBox"
import { PropsWithChildren } from "react"


const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const navLinks = [
      { label: 'Writing', href: '/posts' },
      { label: 'Library', href: '/books' },
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
    ]
    return (<>
      {/* <SkyBox /> */}
      <Nav navLinks={navLinks} />
      <main className="mx-2 mt-10 pb-36 md:mt-0 md:mx-4">{ children }</main>
    </>)
}

export default BaseLayout