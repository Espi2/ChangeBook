'use client';

import { UsersGrid } from "../components/UsersGrid";
import { initialData } from "../interfaces/interfaces";
import { TopMenu } from "../top-menu/TopMenu";

const products = initialData.products;

export default function () {
    return (
        <>
            <TopMenu />
            <UsersGrid
            products={products}
            />
        </>
    )
}