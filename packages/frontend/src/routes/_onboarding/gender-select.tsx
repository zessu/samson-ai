import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';

import { useStore } from '../../state/onboarding';
import { onBoardingSchema } from 'shared';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const genderSchema = onBoardingSchema.pick({ gender: true });
type GenderFormValues = z.infer<typeof genderSchema>;

export const Route = createFileRoute('/_onboarding/gender-select')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<GenderFormValues>({
    resolver: zodResolver(genderSchema),
  });

  const onSubmit: SubmitHandler<GenderFormValues> = (data) => {
    try {
      useStore.setState(data);
      goToNextPage();
    } catch (error) {
      console.log(error);
    }
  };

  const goToNextPage = () => {
    navigate({ to: '/age-select' });
  };

  return (
    <div>
      <div className="text-xl flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3 className="font-bold text-lg mb-4">
            Lets begin by creating your profile
          </h3>
          <div className="mb-8">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
          <Button type="submit">Next</Button>
        </form>
      </div>
    </div>
  );
}
