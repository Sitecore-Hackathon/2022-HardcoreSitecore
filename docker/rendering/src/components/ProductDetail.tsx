import { Text, RichText, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import OcProductDetail from '../ordercloud/components/OcProductDetail'
import { useOcSelector } from '../ordercloud/redux/ocStore'

type ProductDetailProps = StyleguideComponentProps & {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
};

const ProductDetail = (props: ProductDetailProps): JSX.Element => (
  <div>
    <Text tag="h2" className="display-4" field={props.fields.heading} />
    <OcProduct />
    <hr/>
    <RichText className="contentDescription" field={props.fields.content} />
  </div>
);

// ========================================

const OcProduct: FunctionComponent = () => {
  const { isReady, asPath, query, push } = useRouter()

  const productName = useOcSelector(
    (s) => s.ocProductDetail.product && s.ocProductDetail.product.Name
  )

  const handleLineItemUpdated = () => {
    push('/cart')
  }

  // Parse product ID from last segment of URL
  const prodId = asPath.substring( asPath.lastIndexOf('/') + 1, asPath.indexOf('?')>0 ? asPath.indexOf('?') : asPath.length );

  return (
    <>
      {isReady ? (
        <OcProductDetail
          onLineItemUpdated={handleLineItemUpdated}
          productId={prodId as string}
          lineItemId={query.lineitem as string}
        />
      ) : (
        <h1>Loading</h1>
      )}
    </>
  )
}


export default withDatasourceCheck()<ProductDetailProps>(ProductDetail);