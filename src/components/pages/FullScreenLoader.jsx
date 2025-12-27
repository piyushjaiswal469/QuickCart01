import React from 'react';
const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - Slow rotation */}
        <div className="w-24 h-24 border-4 border-transparent border-t-emerald-500 border-b-emerald-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
        
        {/* Inner Ring - Fast reverse rotation */}
        <div className="absolute w-16 h-16 border-4 border-transparent border-l-indigo-600 border-r-indigo-600 rounded-full animate-[spin_1s_linear_infinite_reverse]"></div>
        
        {/* Static Center Icon */}
        <div className="absolute text-emerald-600">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
           </svg>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Quick<span className="text-emerald-600">Cart</span>
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1 animate-pulse">
          Securing your items...
        </p>
      </div>
    </div>
  );
}; 
export default FullScreenLoader;