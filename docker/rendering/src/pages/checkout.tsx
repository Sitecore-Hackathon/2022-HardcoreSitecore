import { useRouter } from 'next/router'
import { FunctionComponent, useEffect } from 'react'
import OcCheckout from '../ordercloud/components/OcCheckout'
import OcCheckoutSummary from '../ordercloud/components/OcCheckout/OcCheckoutSummary'
import OcLineItemList from '../ordercloud/components/OcLineItemList'
import { useOcSelector } from '../ordercloud/redux/ocStore'
import Navigation from '../Navigation'

const CheckoutPage: FunctionComponent = () => {
  const { push } = useRouter()
  const { order, initialized } = useOcSelector((s) => s.ocCurrentOrder)

  useEffect(() => {
    if (!initialized || !order || (order && !order.LineItemCount)) {
      push('/cart')
    }
  }, [order, initialized, push])

  return initialized ? (
    <>
      <Navigation />
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: `1fr minmax(150px, 25%)` }}>
          <OcCheckout onSubmitted={(orderId: string) => push(`/confirmation/${orderId}`)} />
          <div>
            <OcLineItemList />
            <OcCheckoutSummary />
          </div>
        </div>
      </div>
    </>
  ) : null
}

export default CheckoutPage
