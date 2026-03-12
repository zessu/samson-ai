import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { onBoardingSchema } from 'shared';

import { useStore } from '../../state/onboarding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_onboarding/age-select')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading ...</div>,
  errorComponent: () => <div> An error occurred ...</div>,
});

const ageSchema = onBoardingSchema.pick({ age: true });
type ageInputType = z.infer<typeof ageSchema>;

function RouteComponent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ageInputType>({
    resolver: zodResolver(ageSchema),
  });

  const onSubmit: SubmitHandler<ageInputType> = (data) => {
    useStore.setState(data);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: '/weight-select' });
  };

  return (
    <div className="w-64">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <Label htmlFor="age" className="sr-only">
            How old are you ?
          </Label>
          <Input
            type="number"
            id="age"
            placeholder="How old are you ?"
            {...register('age', {
              valueAsNumber: true,
            })}
          />
          {errors.age && (
            <p className="text-sm text-destructive mt-1">
              That does not seem right!
            </p>
          )}
        </div>
        <Button type="submit" className="mt-4">
          Continue
        </Button>
      </form>
    </div>
  );
}
