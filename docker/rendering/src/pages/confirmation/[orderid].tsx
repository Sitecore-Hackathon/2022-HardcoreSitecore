import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcOrderConfirmation from '../../ordercloud/components/OcOrderConfirmation'
import Navigation from '../../Navigation'

const OrderConfirmationPage: FunctionComponent = () => {
  const { isReady, query } = useRouter()

  return (
    <>
      <Head>
        <title>Order Confirmed</title>
      </Head>
      <Navigation />
      <div className="container">
        {isReady ? <OcOrderConfirmation orderId={query.orderid as string} /> : <h1>Loading</h1>}
      </div>
    </>
  )
}

export default OrderConfirmationPage
