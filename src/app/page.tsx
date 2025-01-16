

import Herosection from "./component/Herosection";
import Brandsection from "./component/Brandsection";
import Product from "./component/Product";
import Categories from "./component/Categories";
import Popularstyles from "./component/Popularstyles"
import ProductSection from "./component/productsection";








export default function Home() {
  return (
    <div>
     
   
      
      <Herosection />
      <Brandsection />
    
       <Product />
      <Categories />
      <Popularstyles />
      <ProductSection />
    
   
    </div>
  
  );
}
