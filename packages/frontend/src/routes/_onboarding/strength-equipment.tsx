import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useStore } from '../../state/onboarding';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_onboarding/strength-equipment')({
  component: RouteComponent,
});

type StrengthEquipmentInputs = {
  dumbbells: boolean;
  barbells: boolean;
  kettlebells: boolean;
  weightPlates: boolean;
  pullUpBar: boolean;
  longBar: boolean;
  heavyBar: boolean;
  deadliftBar: boolean;
  legPressMachine: boolean;
  latPulldownMachine: boolean;
  chestPressMachine: boolean;
  shoulderPressMachine: boolean;
  seatedRowMachine: boolean;
  weightBelt: boolean;
};

const strengthEquipmentValues: Record<keyof StrengthEquipmentInputs, string> = {
  dumbbells: 'Dumbbells',
  barbells: 'Barbells',
  kettlebells: 'Kettlebells',
  weightPlates: 'Weight Plates',
  pullUpBar: 'Pull Up Bar',
  longBar: 'Long Bar',
  heavyBar: 'Heavy Bar',
  deadliftBar: 'Deadlift Bar',
  legPressMachine: 'Leg Press Machine',
  latPulldownMachine: 'Lat Pulldown Machine',
  chestPressMachine: 'Chest Press Machine',
  shoulderPressMachine: 'Shoulder Press Machine',
  seatedRowMachine: 'Seated Row Machine',
  weightBelt: 'Weight Belt',
};

function RouteComponent() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<StrengthEquipmentInputs>();

  const onSubmit: SubmitHandler<StrengthEquipmentInputs> = (data) => {
    const equipment = Object.entries(data)
      .filter(([_, value]) => value === true)
      .map(
        ([key]) => strengthEquipmentValues[key as keyof StrengthEquipmentInputs]
      );
    useStore.setState((state) => ({
      equipment: [...state.equipment, ...equipment],
    }));
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: '/day-time' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-3 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            What equipment in this list do you have?
          </h3>

          {/* Free Weights */}
          <div className="flex items-center gap-2">
            <Controller
              name="dumbbells"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="dumbbells"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="dumbbells">Dumbbells</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="barbells"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="barbells"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="barbells">Barbells</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="kettlebells"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="kettlebells"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="kettlebells">Kettlebells</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="weightPlates"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="weightPlates"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="weightPlates">Weight Plates</Label>
                </>
              )}
            />
          </div>

          {/* Bars */}
          <div className="flex items-center gap-2">
            <Controller
              name="pullUpBar"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="pullUpBar"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="pullUpBar">Pull Up Bar</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="longBar"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="longBar"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="longBar">Long Bar</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="heavyBar"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="heavyBar"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="heavyBar">Heavy Bar</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="deadliftBar"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="deadliftBar"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="deadliftBar">Deadlift Bar</Label>
                </>
              )}
            />
          </div>

          {/* Machines */}
          <div className="flex items-center gap-2">
            <Controller
              name="legPressMachine"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="legPressMachine"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="legPressMachine">Leg Press Machine</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="latPulldownMachine"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="latPulldownMachine"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="latPulldownMachine">
                    Lat Pulldown Machine
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="chestPressMachine"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="chestPressMachine"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="chestPressMachine">Chest Press Machine</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="shoulderPressMachine"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="shoulderPressMachine"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="shoulderPressMachine">
                    Shoulder Press Machine
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="seatedRowMachine"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="seatedRowMachine"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="seatedRowMachine">Seated Row Machine</Label>
                </>
              )}
            />
          </div>

          {/* Accessories */}
          <div className="flex items-center gap-2">
            <Controller
              name="weightBelt"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="weightBelt"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="weightBelt">Weight Belt</Label>
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
