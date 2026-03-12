import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useStore } from '../../state/onboarding';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_onboarding/goals')({
  component: RouteComponent,
});

type goalInputs = {
  weight: boolean;
  muscle: boolean;
  tone: boolean;
  cardio: boolean;
  endurance: boolean;
  flexibility: boolean;
  posture: boolean;
  stress: boolean;
  maintain: boolean;
  sport: boolean;
  rehabilitate: boolean;
};

const goalValues: Record<keyof goalInputs, string> = {
  weight: 'lose weight',
  muscle: 'add muscle',
  tone: 'tone my body',
  cardio: 'increase cardiovascular fitness',
  endurance: 'increase endurance and stamina',
  flexibility: 'improve flexibility and mobility',
  posture: 'fix posture and reduce back pain',
  stress: 'stress relief and mental wellness',
  maintain: 'maintain fitness as I age',
  sport: 'train for a sport',
  rehabilitate: 'rehabilitate an injury',
};

function RouteComponent() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<goalInputs>({
    defaultValues: {
      weight: false,
      muscle: false,
      tone: false,
      cardio: false,
      endurance: false,
      flexibility: false,
      posture: false,
      stress: false,
      maintain: false,
      sport: false,
      rehabilitate: false,
    },
  });

  const onSubmit: SubmitHandler<goalInputs> = (data) => {
    const selectedGoals = Object.entries(data)
      .filter(([_, value]) => value === true)
      .map(([key]) => goalValues[key as keyof goalInputs]);

    useStore.setState({ goals: selectedGoals });
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: '/cardio-equipment' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4 p-4">
          <h3 className="font-bold text-lg mb-2">Select Your Fitness Goals</h3>

          {/* Weight & Body Composition */}
          <div className="flex items-center gap-2">
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="weight"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="weight">Lose Weight</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="muscle"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="muscle"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="muscle">Add Muscle / Build Strength</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="tone"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="tone"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="tone">Tone Muscles (Lean & Defined)</Label>
                </>
              )}
            />
          </div>

          {/* Performance & Endurance */}
          <div className="flex items-center gap-2">
            <Controller
              name="cardio"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="cardio"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="cardio">
                    Improve Cardio (Running, Cycling, etc.)
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="endurance"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="endurance"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="endurance">
                    Increase Endurance & Stamina
                  </Label>
                </>
              )}
            />
          </div>

          {/* Mobility & Functional Fitness */}
          <div className="flex items-center gap-2">
            <Controller
              name="flexibility"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="flexibility"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="flexibility">
                    Improve Flexibility & Mobility
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="posture"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="posture"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="posture">
                    Fix Posture / Reduce Back Pain
                  </Label>
                </>
              )}
            />
          </div>

          {/* Lifestyle & Mental Health */}
          <div className="flex items-center gap-2">
            <Controller
              name="stress"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="stress"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="stress">
                    Stress Relief & Mental Wellness
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="maintain"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="maintain"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="maintain">Maintain Fitness as I Age</Label>
                </>
              )}
            />
          </div>

          {/* Specialized Goals */}
          <div className="flex items-center gap-2">
            <Controller
              name="sport"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="sport"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="sport">
                    Train for a Sport (Basketball, Soccer, etc.)
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="rehabilitate"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="rehabilitate"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="rehabilitate">Rehabilitate an Injury</Label>
                </>
              )}
            />
          </div>
        </div>
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}
