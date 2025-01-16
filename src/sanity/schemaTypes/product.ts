export const product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Product title",
        type: "string",
      },
      {
        name: "price",
        title: "Product price",
        type: "string",
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
