import React from 'react';
import { ShoppingBag, Search, Filter, Star, Phone } from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Custom Wooden Coffee Table',
    desc: 'Handcrafted solid oak wood coffee table with a modern finish. Perfect for living rooms.',
    price: 3500,
    seller: 'Sunil Singh (Carpenter)',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80'
  },
  {
    id: 2,
    title: 'Spare MCB Switch (32A)',
    desc: 'Brand new 32A MCB switch, bought extra during a job. Unused and in original packaging.',
    price: 150,
    seller: 'Amit Verma (Electrician)',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=500&q=80'
  },
  {
    id: 3,
    title: 'Used PVC Pipes Bundle',
    desc: 'Leftover PVC pipes from a large plumbing project. Around 10 meters total in various sizes.',
    price: 400,
    seller: 'Rajesh Kumar (Plumber)',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=500&q=80'
  }
];

export default function CustomerMarketplace() {
  return (
    <div className="pb-24">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-6 mb-6 shadow-lg">
        <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6" /> LocalFix Shop
        </h2>
        <p className="text-sm font-medium text-blue-100 mb-4">
          Buy handmade products or spare parts directly from verified local workers.
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-blue-200 outline-none focus:bg-white/20 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="font-bold text-slate-900 text-lg">Available Items</h3>
        <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="h-48 relative bg-slate-100">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-green-700 font-bold px-3 py-1 rounded-full shadow-sm text-sm">
                ₹{product.price}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="font-bold text-slate-900 text-lg leading-tight mb-2">{product.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{product.desc}</p>
              
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Sold by</div>
                    <div className="text-sm font-bold text-slate-800">{product.seller}</div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-bold border border-amber-100">
                    <Star className="w-3 h-3 fill-current" /> {product.rating}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Contacting seller...')} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Contact
                  </button>
                  <button onClick={() => alert('Item added to cart!')} className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-sm shadow-blue-600/30">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
