

import Image from 'next/image';
import { client } from 'src/sanity/lib/client';

interface PageProps {
  params: {
    slug: string;
  };
}

// Fetch product data
const getData = async (slug: string) => {
  const query = `*[_type == "allproduct" && slug.current == $slug]{
    title,
    price,
    description,
    images[] {
      "imageUrl": image.asset->url
    }
  }`;
  return await client.fetch(query, { slug });
};

// Dynamic product page component
const ProductPage = async ({ params }: PageProps) => {
  const { slug } = params;
  const product = await getData(slug);

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>Check the URL or browse other products.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.title}</h1>
      {product.images?.[0]?.imageUrl && (
        <Image
          src={product.images[0].imageUrl}
          alt={`Image of ${product.title}`}
          width={500}
          height={500}
        />
      )}
    </div>
  );
};

export default ProductPage;
