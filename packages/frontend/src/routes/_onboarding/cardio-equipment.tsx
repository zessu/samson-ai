import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useStore } from '../../state/onboarding';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/_onboarding/cardio-equipment')({
  component: RouteComponent,
});

type cardioEquipmentInputs = {
  treadmill: boolean;
  runningTrack: boolean;
  ellipticalTrainer: boolean;
  stationaryBike: boolean;
  rowingMachine: boolean;
  resistanceBands: boolean;
  exerciseMats: boolean;
  stabilityBalls: boolean;
  foamRollers: boolean;
  skippingRopes: boolean;
  boxingBagAndGloves: boolean;
  medicineBalls: boolean;
};

const equipmentValues: Record<keyof cardioEquipmentInputs, string> = {
  treadmill: 'Treadmill',
  runningTrack: 'Access to a running track',
  ellipticalTrainer: 'Elliptical Trainer',
  stationaryBike: 'Stationary Bike',
  rowingMachine: 'Rowing Machine',
  resistanceBands: 'Resistance Bands',
  exerciseMats: 'Exercise Mats',
  stabilityBalls: 'Stability Balls',
  foamRollers: 'Foam Rollers',
  skippingRopes: 'Skipping Ropes / Jump Ropes',
  boxingBagAndGloves: 'Boxing Bag & Gloves',
  medicineBalls: 'Medicine Balls / Slam Balls',
};

function RouteComponent() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<cardioEquipmentInputs>();

  const onSubmit: SubmitHandler<cardioEquipmentInputs> = (data) => {
    const equipment = Object.entries(data)
      .filter(([_, value]) => value === true)
      .map(([key]) => equipmentValues[key as keyof cardioEquipmentInputs]);
    useStore.setState((state) => ({
      equipment: [...state.equipment, ...equipment],
    }));
    goToNextPage();
  };

  const goToNextPage = () => {
    navigate({ to: '/strength-equipment' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-3 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            What equipment in this list do you own ?
          </h3>

          {/* Cardio Machines */}
          <div className="flex items-center gap-2">
            <Controller
              name="treadmill"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="treadmill"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="treadmill">Treadmill</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="runningTrack"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="runningTrack"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="runningTrack">
                    Access to a running track
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="ellipticalTrainer"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="ellipticalTrainer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="ellipticalTrainer">Elliptical Trainer</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="stationaryBike"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="stationaryBike"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="stationaryBike">Stationary Bike</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="rowingMachine"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="rowingMachine"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="rowingMachine">Rowing Machine</Label>
                </>
              )}
            />
          </div>

          {/* Small Equipment */}
          <div className="flex items-center gap-2">
            <Controller
              name="resistanceBands"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="resistanceBands"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="resistanceBands">Resistance Bands</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="exerciseMats"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="exerciseMats"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="exerciseMats">Exercise Mats</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="stabilityBalls"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="stabilityBalls"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="stabilityBalls">Stability Balls</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="foamRollers"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="foamRollers"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="foamRollers">Foam Rollers</Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="skippingRopes"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="skippingRopes"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="skippingRopes">
                    Skipping Ropes / Jump Ropes
                  </Label>
                </>
              )}
            />
          </div>

          {/* Strength & Specialty */}
          <div className="flex items-center gap-2">
            <Controller
              name="boxingBagAndGloves"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="boxingBagAndGloves"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="boxingBagAndGloves">
                    Boxing Bag & Gloves
                  </Label>
                </>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="medicineBalls"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    id="medicineBalls"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="medicineBalls">
                    Medicine Balls / Slam Balls
                  </Label>
                </>
              )}
            />
          </div>
        </div>
        <Button type="submit">Next List</Button>
      </form>
    </div>
  );
}
