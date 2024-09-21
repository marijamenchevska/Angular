import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/** Car distance can't be anything but 0 if the car is new */
export const newCarDistanceValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const condition = control.get('isNew');
  const distance = control.get('distance');

  //   console.log(condition?.value === 'New' && Boolean(distance?.value));

  return condition &&
    distance &&
    condition.value === 'New' &&
    distance.value !== '' &&
    distance.value > 0
    ? { newCar: true }
    : null;
};
