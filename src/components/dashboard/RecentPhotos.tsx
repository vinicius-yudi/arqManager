import React from 'react';
import { Plus } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import { PhotoItem } from '../../types';

interface RecentPhotosProps {
  photos: PhotoItem[];
}

const RecentPhotos: React.FC<RecentPhotosProps> = ({ photos }) => {
  // Take only the most recent photos (up to 6)
  const recentPhotos = [...photos]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 6);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Fotos Recentes</h3>
        <Button variant="outline" size="sm" icon={<Plus size={16} />}>
          Adicionar Foto
        </Button>
      </CardHeader>
      
      <CardContent>
        {recentPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recentPhotos.map((photo) => (
              <div key={photo.id} className="relative rounded-lg overflow-hidden aspect-square group">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                  <p className="text-white text-xs truncate">{photo.caption}</p>
                  <p className="text-gray-300 text-xs">
                    {new Date(photo.uploadedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-gray-500 mb-4">Nenhuma foto adicionada ainda</p>
            <Button variant="secondary" size="sm" icon={<Plus size={16} />}>
              Adicionar Primeira Foto
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPhotos;