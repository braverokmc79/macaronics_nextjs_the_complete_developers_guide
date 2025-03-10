import React from "react";
import SearchBar from "./components/search-bar";
import ProductsNavMenu from "./components/nav-menu";
import ProductsSectionBbannerComponent from "./components/section-banner";


interface ProductsLayoutProps {
    children: React.ReactNode;
}

const ProductsLayout = async ({ children }: ProductsLayoutProps) => {
    
    return (
        <>
        <div className="w-full ">
            <div className="relative container mx-auto p-6">
                <SearchBar />
                
                <ProductsNavMenu />

                <ProductsSectionBbannerComponent />
                {children}
            </div>
        </div>
        </>
    );
};

export default ProductsLayout;
