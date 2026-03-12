import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { onBoardingSchema } from 'shared';
import { useStore } from '../../state/onboarding';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Route = createFileRoute('/_onboarding/fitness-select')({
  component: RouteComponent,
});

const levelSchema = onBoardingSchema.pick({ fitnessLevel: true });
type fitnessLevelInput = z.infer<typeof levelSchema>;

function RouteComponent() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<fitnessLevelInput>({
    resolver: zodResolver(levelSchema),
    defaultValues: {
      fitnessLevel: 'beginner',
    },
  });

  const selectedLevel = watch('fitnessLevel');

  const onSubmit: SubmitHandler<fitnessLevelInput> = (data) => {
    useStore.setState(data);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: '/goals' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <p className="mb-2">What's your fitness level ?</p>
        <Select
          value={selectedLevel}
          onValueChange={(value) =>
            setValue(
              'fitnessLevel',
              value as 'beginner' | 'intermediate' | 'advanced'
            )
          }
        >
          <SelectTrigger className="mb-4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        {errors.fitnessLevel && (
          <p className="text-sm text-destructive mb-2">
            {errors.fitnessLevel.message}
          </p>
        )}
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}
