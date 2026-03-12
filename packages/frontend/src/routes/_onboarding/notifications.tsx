import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { onBoardingSchema, onBoardingState } from 'shared';

import { useStore } from '../../state/onboarding';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_onboarding/notifications')({
  component: RouteComponent,
});

type notificationInputs = {
  email: boolean;
  app: boolean;
  sms: boolean;
};

function RouteComponent() {
  const [onBoardingError, setonBoardingError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<notificationInputs>({
    defaultValues: {
      email: true,
      app: false,
      sms: false,
    },
  });

  const submitForm = async (data: onBoardingState) => {
    return await fetch('/api/createProfile', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  };

  const finish: SubmitHandler<notificationInputs> = async (data) => {
    useStore.setState({ notifications: data });
    const userSettings = useStore.getState();
    try {
      const validated = onBoardingSchema.parse(userSettings);
      setIsLoading(true);
      const res = await submitForm(validated);
      if (res.ok) {
        navigate({ to: '/dashboard' });
      } else {
        if (!res.ok) setonBoardingError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-xl flex flex-col">
      {onBoardingError && (
        <div
          role="alert"
          className="bg-destructive text-destructive-foreground p-4 rounded-md mb-4"
        >
          <span>
            There was a problem processing your request. Give it a minute and
            try again
          </span>
        </div>
      )}

      <h3 className="font-bold text-lg mb-2">
        What's the best way to reach you with your daily workouts?
      </h3>

      <form
        onSubmit={handleSubmit(finish)}
        noValidate
        className="mb-10 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4">
          <Checkbox id="email" value="email" {...register('email')} />
          <Label htmlFor="email">Email</Label>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Checkbox id="app" value="app" disabled {...register('app')} />
          <Label htmlFor="app" className="opacity-50">
            In App (Work In Progress)
          </Label>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Checkbox id="sms" value="sms" disabled {...register('sms')} />
          <Label htmlFor="sms" className="opacity-50">
            Via SMS (Work In Progress)
          </Label>
        </div>

        <Button type="submit">
          {isLoading ? 'Submitting your details ...' : 'Start My Journey'}
        </Button>
      </form>
    </div>
  );
}
