import React from 'react';
import { Button } from '../components/ui/button';
import { TbBoxOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

type NotFoundProps = {
  title: string,
  description: string,
  link?: string
}

export default function NotFoundComponent({ title, description, link } : NotFoundProps) {
    const navigate = useNavigate();
  return (
    <section className="flex justify-center mt-20 h-screen">
      <div className="text-center flex flex-col items-center space-y-4 max-w-[700px]">
        <TbBoxOff size={128}/>
        <h1 className="text-4xl font-bold text-red-600">{title}</h1>
        <p className="text-muted-foreground text-base">{description}</p>
        {link && (
            <Button onClick={() => navigate(link)}>Voltar</Button>
        )}
        
      </div>
    </section>
  );
}
