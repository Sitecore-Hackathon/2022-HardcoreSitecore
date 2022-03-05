import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcLoginForm from '../ordercloud/components/OcLoginForm'
import Navigation from '../Navigation'

const LoginPage: FunctionComponent = () => {
  const { push } = useRouter()

  const handleOnLoggedIn = () => {
    push('/products')
  }

  return (
    <>
      <Navigation />
      <div className="container">
        <OcLoginForm onLoggedIn={handleOnLoggedIn} />
      </div>
    </>
  )
}

export default LoginPage
