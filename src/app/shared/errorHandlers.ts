import {FormGroup} from "@angular/forms";

export function handleFormHttpError(response: any, form: FormGroup, errors: string[]) {
  if (response.error && !(response.error instanceof ProgressEvent)) {
    for (let k in response.error) {
      if (k in form.controls) {
        form.controls[k].setErrors({
          serverError: response.error[k][0]
        });
      } else if (typeof response.error[k] === 'string') {
        errors.push(response.error[k]);
      } else {
        errors.push(response.error[k][0]);
      }
    }
  } else {
    console.error(response);
  }
}
