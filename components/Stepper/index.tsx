import styles from "components/Stepper/Stepper.module.css";

import type { HTMLProps } from "react";
import { Children } from "react";

type StepProps = {
  pos: number;
} & HTMLProps<HTMLDivElement>;

export const Stepper = ({ children, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={styles.stepper}>
      {Children.map(children, (child, pos) => (
        <Step pos={pos} key={pos}>
          {child}
        </Step>
      ))}
    </div>
  );
};

const Step = ({ children, pos, ...props }: StepProps) => {
  return (
    <div {...props} className={styles.step} data-pos={pos}>
      {children}
    </div>
  );
};
