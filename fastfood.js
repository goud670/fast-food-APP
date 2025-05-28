import React, { useState } from "react";

const menuItems = [
  {
    name: "Burger (Chicken)",
    image: "https://i.imgur.com/abc1.png",
    price: 5.99
  },
  {
    name: "Burger (Mushroom)",
    image: "https://i.imgur.com/abc2.png",
    price: 6.49
  },
  {
    name: "Side (Nuggets)",
    image: "https://i.imgur.com/abc3.png",
    price: 3.49
  }
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  const viewCart = () => {
    const cartDetails = cart
      .map((item) => `- ${item.name}: $${item.price.toFixed(2)}`)
      .join("\n");
    alert("Your Cart:\n" + cartDetails);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Menu Of The Day</h2>
        <button
          onClick={viewCart}
          className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          🛒
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto rounded-lg mb-2"
            />
            <h5 className="text-lg font-semibold">{item.name}</h5>
            <p className="text-gray-700">${item.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
