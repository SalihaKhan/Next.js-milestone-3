export const allProduct = {
    name: "allproduct",
    title: "All Products",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Product title",
        type: "string",
      },
      {
        name: "description",
        title: "Product description",
        type: "string",
      },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
      },
      {
        name: "price",
        title: "Product price",
        type: "string",
      },
      {
        name: "stock",
        title: "Product stock",
        type: "number",
      },
      {
        name: "oldPrice",
        title: "Product old price",
        type: "string",
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true, // Enable image hotspot for better cropping
                },
              },
              {
                name: 'cart',
                title: 'Cart Image',
                type: 'image',
              },
            ],
          },
        ],
      },
     
      {
        name: "label",
        title: "Label",
        type: "string",
      },
      {
        name: "labelColor",
        title: "Label color",
        type: "string",
      },
   
    ]     
}
