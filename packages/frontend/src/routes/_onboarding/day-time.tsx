import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useStore } from '../../state/onboarding';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_onboarding/day-time')({
  component: RouteComponent,
});

const dayTimeSchema = z.object({
  Monday: z.boolean(),
  Tuesday: z.boolean(),
  Wednesday: z.boolean(),
  Thursday: z.boolean(),
  Friday: z.boolean(),
  Saturday: z.boolean(),
  Sunday: z.boolean(),
});

type daysOfWeekInput = z.infer<typeof dayTimeSchema>;

type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

const dayToWeekday: Record<string, Weekday> = {
  Monday: 'monday',
  Tuesday: 'tuesday',
  Wednesday: 'wednesday',
  Thursday: 'thursday',
  Friday: 'friday',
  Saturday: 'saturday',
  Sunday: 'sunday',
};

function RouteComponent() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<daysOfWeekInput>({
    resolver: zodResolver(dayTimeSchema),
    defaultValues: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
  });

  const goToNextPage = () => {
    navigate({ to: '/time-selector' });
  };

  const onSubmit: SubmitHandler<daysOfWeekInput> = (data) => {
    const weekdays = Object.entries(data)
      .filter(([_, checked]) => checked)
      .map(([day]) => dayToWeekday[day]);
    useStore.setState({ weekdays });
    goToNextPage();
  };

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">
        What Days of the week do you want to work out ?
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex items-center gap-2 mb-2">
          <Controller
            name="Monday"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="monday"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="monday">Monday</Label>
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Controller
            name="Tuesday"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="tuesday"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="tuesday">Tuesday</Label>
              </>
            )}
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Controller
            name="Wednesday"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="wednesday"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="wednesday">Wednesday</Label>
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Controller
            name="Thursday"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="thursday"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="thursday">Thursday</Label>
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Controller
            name="Friday"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="friday"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="friday">Friday</Label>
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Controller
            name="Saturday"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="saturday"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="saturday">Saturday</Label>
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Controller
            name="Sunday"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="sunday"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="sunday">Sunday</Label>
              </>
            )}
          />
        </div>
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}
