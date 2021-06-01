import { List, ListRowRenderer } from 'react-virtualized';

import { ProductItem } from "./ProductItem"

interface SearchResultProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddWishList: (id: number) => void;
}

export function SearchResults({ totalPrice, results, onAddWishList }: SearchResultProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
          product={results[index]} 
          onAddWishList={onAddWishList}
        />
      </div>
    )
  }
  
  return (
    <div>
      <h2>{totalPrice}</h2>

      <List 
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  )
}