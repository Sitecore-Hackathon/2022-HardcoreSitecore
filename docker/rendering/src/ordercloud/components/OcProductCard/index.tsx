import { BuyerProduct } from 'ordercloud-javascript-sdk'
import { FunctionComponent } from 'react'
import Image from 'next/image'

interface OcProductCardProps {
  product: BuyerProduct
}

const OcProductCard: FunctionComponent<OcProductCardProps> = ({ product }) => {
  return (
    <div>
      <p>
        <b>{product.Name}</b>
      </p>
      {product.xp.Images.length && (
        <Image
          src={product.xp.Images[0].url!}
          alt={product.xp.Images[0].alt || 'Product Image'}
          width={150}
          height={150}
          priority={true}
          quality="85"
        />
      )}
      <p>{product.Description}</p>
    </div>
  )
}

export default OcProductCard
