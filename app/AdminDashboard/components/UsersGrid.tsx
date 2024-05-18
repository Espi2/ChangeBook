'use-client';

import { SeedProduct } from "../interfaces/interfaces";
import { UserGridItem } from "./UserGridItem";

interface Props{
    products: SeedProduct[];
}

export const UsersGrid = ({products}: Props) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10 mx-3'>
        {
            products.map( product => (
                <UserGridItem
                    key={ product.codigo }
                    product={ product }
                />
            ))
        }

    </div>
  )
}
