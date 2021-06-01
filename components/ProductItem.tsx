import { memo, useState } from 'react';
import dynamic from 'next/dynamic'
import { AddProductToWishListProps } from './AddProductToWishList';
import lodash from 'lodash'

// const AddProductToWishList = lazy(() => {
//   import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
// })

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    priceFormatted: string;
    price: number;
    title: string;
  }
  onAddWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)
  
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(false)}>Adicionar aos favoritos</button>
      
      { isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      ) }
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
}); 