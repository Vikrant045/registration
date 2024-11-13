"use client"
import Image from "next/image";
import { useSelector,useDispatch } from "react-redux";
import { increment,decrement } from "./store/slices/counterSlice";
export default function Home() {

  const count = useSelector((state)=> state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      counter = {count}
      <div className="text-4xl" onClick={() => dispatch(increment())}>
        +
      </div>
      <div className="text-4xl" onClick={() => dispatch(decrement())}>
        -
      </div>
    </div>
  );
}
