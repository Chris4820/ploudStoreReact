import React from 'react';

export type CardType = {
  title: string;
  price: any;
  symbol: string;
  icon?: React.ElementType;
};

export default function Cards({ title, price, symbol, icon }: CardType) {
  const Icon = icon;

    return (
      <div className="flex items-center justify-between p-4 border border-border rounded-md shadow bg-card">
        <div>
          <p className="mb-2 text-primay text-lg font-semibold">{title}</p>
          <div className="flex items-center text-2xl font-bold text-primary">
            <h2>{price}</h2>
            <h2>{symbol}</h2>
          </div>
        </div>
        <div>
          <span className="inline-block p-4 mr-2 text-purple-600 bg-secondary rounded-full">
            {Icon && <Icon className="w-8 h-8" />}
          </span>
        </div>
      </div>
    );
  }
