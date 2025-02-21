import React from 'react';
import { CgSpinner } from 'react-icons/cg';

export type CardType = {
  title: string;
  price: string | number;
  isLoading: boolean,
  icon?: React.ElementType;
  isInt?: boolean
};

export default function Cards({ title, price, icon, isLoading }: CardType) {
  const Icon = icon;

    return (
      <div className="flex items-center justify-between p-4 border border-border rounded-md shadow bg-card">
        <div>
          <p className="mb-2 text-primay text-lg font-semibold">{title}</p>
          <div className="flex items-center text-2xl font-bold text-primary">
            {isLoading ? (
                <CgSpinner className="animate-spin"/>
            ) : (
              <h2>{price}</h2>
            )}
          </div>
        </div>
        <div>
          <span className="inline-block p-4 mr-2 bg-violet-600/20 border  rounded-full shadow-lg">
            {Icon && <Icon className="w-8 h-8 text-violet-600" />} {/* Ícone em branco para contraste */}
          </span>
        </div>
      </div>
    );
  }
