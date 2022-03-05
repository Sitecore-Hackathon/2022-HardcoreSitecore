import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcProductDetail from '../../ordercloud/components/OcProductDetail'
import { useOcSelector } from '../../ordercloud/redux/ocStore'
import Navigation from '../../Navigation'

const ProductPage: FunctionComponent = () => {
  const { isReady, query, push } = useRouter()

  const productName = useOcSelector(
    (s) => s.ocProductDetail.product && s.ocProductDetail.product.Name
  )

  const handleLineItemUpdated = () => {
    push('/cart')
  }

  return (
    <>
      <Head>
        <title>{productName}</title>
      </Head>
      <Navigation/>
      <div className="container">
        {isReady ? (
          <OcProductDetail
            onLineItemUpdated={handleLineItemUpdated}
            productId={query.productid as string}
            lineItemId={query.lineitem as string}
          />
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </>
  )
}

export default ProductPage
