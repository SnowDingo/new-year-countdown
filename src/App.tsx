import { createSignal, onCleanup } from "solid-js";
import "./App.css";
import { Progress, ProgressValueLabel } from "./components/ui/progress";

import * as dayjs from "dayjs";

import { Callout, CalloutContent, CalloutTitle } from "./components/ui/callout";

function App() {
  let date = new Date();
  let timestamp = Date.now();
  const [percentchange, setPercentchange] = createSignal(0.0);
  const [currentTime, setCurrentTime] = createSignal(
    new Date().toLocaleTimeString()
  );

  const interval = setInterval(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());

    const startoftheyear = new Date(date.getFullYear(), 0, 1);
    setPercentchange(
      100 -
        ((now.getTime() - startoftheyear.getTime()) /
          startoftheyear.getTime()) *
          100
    );
    console.log(percentchange);
    console.log(startoftheyear.getTime());
    console.log(timestamp);
  }, 1000);

  onCleanup(() => clearInterval(interval));

  return (
    <div class="text-center  my-10 ">
      <h1 class="text-center text-5xl">New Year Tracker</h1>
      <div>
        <Progress
          class=" max-w-96 m-auto my-10 border-2 border-solid border-black border-r-0"
          value={percentchange()}
        />
      </div>
      <p>{currentTime()}</p>
      <p>{percentchange().toFixed(8)} % done</p>
      <Callout class="max-w-80 m-auto my-8">
        <CalloutTitle>About this website</CalloutTitle>
        <CalloutContent>
          This website calculates the remaining percentage of the year as well as time.
          Come back each day to see progress!!
        </CalloutContent>
      </Callout>
    </div>
  );
}

export default App;
