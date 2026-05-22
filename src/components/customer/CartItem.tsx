"use client";

type CartItemProps = {
  name: string;
  price: number;
  quantity: number;
};

export default function CartItem({ name, price, quantity }: CartItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
      <p className="font-semibold text-green-700">?{price * quantity}</p>
    </div>
  );
}
