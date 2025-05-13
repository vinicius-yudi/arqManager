import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Project } from '../../types';

const projectSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  location: z.string().min(5, 'Endereço deve ter no mínimo 5 caracteres'),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().min(0, 'Orçamento deve ser maior que zero'),
  client: z.object({
    name: z.string().min(3, 'Nome do cliente deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
  }),
  team: z.array(z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    role: z.string().min(2, 'Cargo deve ter no mínimo 2 caracteres'),
    contact: z.string().min(8, 'Contato deve ter no mínimo 8 caracteres'),
  })),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      name: project.name,
      location: project.location,
      startDate: format(new Date(project.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(project.endDate), 'yyyy-MM-dd'),
      budget: project.budget,
      client: {
        name: project.client.name,
        email: project.client.email,
      },
      team: project.team.map(member => ({
        name: member.name,
        role: member.role,
        contact: member.contact,
      })),
    } : {
      team: [{ name: '', role: '', contact: '' }],
    },
  });

  const team = watch('team');

  const addTeamMember = () => {
    setValue('team', [...team, { name: '', role: '', contact: '' }]);
  };

  const removeTeamMember = (index: number) => {
    setValue('team', team.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h3>
          <div className="space-y-4">
            <Input
              label="Nome do Projeto"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Localização"
              error={errors.location?.message}
              {...register('location')}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                label="Data de Início"
                error={errors.startDate?.message}
                {...register('startDate')}
              />
              <Input
                type="date"
                label="Previsão de Término"
                error={errors.endDate?.message}
                {...register('endDate')}
              />
            </div>
            <Input
              type="number"
              label="Orçamento (R$)"
              error={errors.budget?.message}
              {...register('budget', { valueAsNumber: true })}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Cliente</h3>
          <div className="space-y-4">
            <Input
              label="Nome do Cliente"
              error={errors.client?.name?.message}
              {...register('client.name')}
            />
            <Input
              type="email"
              label="Email do Cliente"
              error={errors.client?.email?.message}
              {...register('client.email')}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Equipe do Projeto</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<Plus size={16} />}
            onClick={addTeamMember}
          >
            Adicionar Membro
          </Button>
        </div>

        <div className="space-y-4">
          {team.map((_, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <Input
                  label="Nome"
                  error={errors.team?.[index]?.name?.message}
                  {...register(`team.${index}.name`)}
                />
                <Input
                  label="Cargo"
                  error={errors.team?.[index]?.role?.message}
                  {...register(`team.${index}.role`)}
                />
                <Input
                  label="Contato"
                  error={errors.team?.[index]?.contact?.message}
                  {...register(`team.${index}.contact`)}
                />
              </div>
              {team.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-8"
                  icon={<Trash2 size={16} />}
                  onClick={() => removeTeamMember(index)}
                >
                  Remover
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {project ? 'Salvar Alterações' : 'Criar Projeto'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;