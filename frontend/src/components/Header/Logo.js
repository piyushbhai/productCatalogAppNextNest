import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-light dark:text-light">
        <span className="font-bold dark:font-semibold text-lg md:text-xl">ProductCatalogApp</span>
    </Link>
  )
}

export default Logo