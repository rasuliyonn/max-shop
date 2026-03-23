import Card from "./Card";

const ProductGrid = ({ products, title }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-8 md:mt-16 mb-10">
        {title}
      </h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-lg">
          Товары не найдены
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              img_src={item.img_url}
              name={item.title}
              price={item.price}
              colors={item.colors}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
