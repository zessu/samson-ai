import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useStore } from '../../state/onboarding';

export const Route = createFileRoute('/_onboarding/strength-equipment')({
  component: RouteComponent,
});

type StrengthEquipmentInputs = {
  dumbbells: string | boolean;
  barbells: string | boolean;
  kettlebells: string | boolean;
  weightPlates: string | boolean;
  pullUpBar: string | boolean;
  longBar: string | boolean;
  heavyBar: string | boolean;
  deadliftBar: string | boolean;
  legPressMachine: string | boolean;
  latPulldownMachine: string | boolean;
  chestPressMachine: string | boolean;
  shoulderPressMachine: string | boolean;
  seatedRowMachine: string | boolean;
  weightBelt: string | boolean;
};

function RouteComponent() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<StrengthEquipmentInputs>();

  const onSubmit: SubmitHandler<StrengthEquipmentInputs> = (data) => {
    const equipment = Object.values(data).filter(
      (val): val is string => val !== false
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
            What equipment in this list do you have?
          </h3>

          {/* Free Weights */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('dumbbells', { required: false })}
              value="Dumbbells"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Dumbbells</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('barbells', { required: false })}
              value="Barbells"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Barbells</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('kettlebells', { required: false })}
              value="Kettlebells"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Kettlebells</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('weightPlates', { required: false })}
              value="Weight Plates"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Weight Plates</span>
          </div>

          {/* Bars */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('pullUpBar', { required: false })}
              value="Pull Up Bar"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Pull Up Bar</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('longBar', { required: false })}
              value="Long Bar"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Long Bar</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('heavyBar', { required: false })}
              value="Heavy Bar"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Heavy Bar</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('deadliftBar', { required: false })}
              value="Deadlift Bar"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Deadlift Bar</span>
          </div>

          {/* Machines */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('legPressMachine', {
                required: false,
              })}
              value="Leg Press Machine"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Leg Press Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('latPulldownMachine', {
                required: false,
              })}
              value="Lat Pulldown Machine"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Lat Pulldown Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('chestPressMachine', {
                required: false,
              })}
              value="Chest Press Machine"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Chest Press Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('shoulderPressMachine', {
                required: false,
              })}
              value="Shoulder Press Machine"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Shoulder Press Machine</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('seatedRowMachine', {
                required: false,
              })}
              value="Seated Row Machine"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Seated Row Machine</span>
          </div>

          {/* Accessories */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('weightBelt', { required: false })}
              value="Weight Belt"
              className="checkbox checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
            />
            <span>Weight Belt</span>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
