import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_onboarding/workout')({
  component: DailyWorkout,
});

function DailyWorkout() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="bold">Your Workouts for today</h2>
        <div className="flex flex-col gap-5">
          <Card className="w-96 overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Upper Body</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Working out these upper body exercises</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline">Start</Button>
            </CardFooter>
          </Card>
          <Card className="w-96 overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Full body stretches</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You need to stretch and relax your muscles</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline">Start</Button>
            </CardFooter>
          </Card>
          <Card className="w-96 overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Strength Traning</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Need to lift some weights so you can become strong</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline">Start</Button>
            </CardFooter>
          </Card>
          <Card className="w-96 overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Back</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your core strength is important to your overall health</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline">Start</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
