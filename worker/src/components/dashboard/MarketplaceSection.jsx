import React, { useState } from 'react';
import { Package, Plus, Image as ImageIcon, Video, Tag } from 'lucide-react';

export default function MarketplaceSection({ products, onAddProduct }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', desc: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) return;
    onAddProduct({
      id: Date.now().toString(),
      ...newProduct,
      image: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?w=500&q=80', // mockup image
      seller: 'You'
    });
    setNewProduct({ title: '', desc: '', price: '' });
    setShowAdd(false);
  };

  return (
    <div className="p-4 mb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">My Shop</h2>
          <p className="text-sm text-slate-500">Sell spare parts or handmade goods directly to customers.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-sm flex items-center gap-1 hover:bg-blue-700"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-3">Add New Product</h3>
          <input 
            type="text" 
            placeholder="Product Title" 
            className="w-full mb-3 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
            value={newProduct.title}
            onChange={e => setNewProduct({...newProduct, title: e.target.value})}
            required
          />
          <textarea 
            placeholder="Description..." 
            className="w-full mb-3 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 h-24 resize-none"
            value={newProduct.desc}
            onChange={e => setNewProduct({...newProduct, desc: e.target.value})}
          ></textarea>
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500 font-bold">₹</span>
              </div>
              <input 
                type="number" 
                placeholder="Price" 
                className="w-full pl-8 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                value={newProduct.price}
                onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <button type="button" className="flex items-center gap-1 text-sm bg-slate-100 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-200">
              <ImageIcon size={16} /> Photo
            </button>
            <button type="button" className="flex items-center gap-1 text-sm bg-slate-100 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-200">
              <Video size={16} /> Video
            </button>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 font-bold text-slate-500 hover:text-slate-800">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Publish</button>
          </div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 border-dashed">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No products listed</h3>
          <p className="text-sm text-slate-500">List your first item for sale</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="h-32 bg-slate-100 relative">
                {p.image ? (
                  <img src={p.image} className="w-full h-full object-cover" alt={p.title} />
                ) : (
                  <div className="flex items-center justify-center h-full"><Package className="text-slate-300" /></div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded font-bold text-sm text-green-700">₹{p.price}</div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">{p.title}</h3>
                  <p className="text-[10px] text-slate-500 line-clamp-2">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
