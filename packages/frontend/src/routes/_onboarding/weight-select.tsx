import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useStore } from '../../state/onboarding';
import { onBoardingSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_onboarding/weight-select')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const weightSchema = onBoardingSchema.pick({ weight: true });
  type weightSchema = z.infer<typeof weightSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<weightSchema>({
    resolver: zodResolver(weightSchema),
  });

  const onSubmit: SubmitHandler<weightSchema> = (data) => {
    useStore.setState(data);
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: '/fitness-select' });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-64">
          <Label htmlFor="weight" className="sr-only">
            How many KGs do you weigh?
          </Label>
          <Input
            type="number"
            id="weight"
            placeholder="How many KGs do you weigh?"
            {...register('weight', {
              valueAsNumber: true,
            })}
          />
          {errors.weight && (
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
