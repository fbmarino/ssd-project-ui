import {FormGroup} from "@angular/forms";

export class FormErrorsHandler {
  nonFieldErrors: string[] = [];

  constructor(readonly form: FormGroup) {
  }

  resetAllErrors() {
    this.nonFieldErrors = [];
    for (let k in this.form.controls) {
      this.form.controls[k].updateValueAndValidity();
    }
  }

  isInvalid(formControlName: string) {
    return this.form.controls[formControlName].invalid;
  }

  getErrorMessage(formControlName: string) {
    let control = this.form.controls[formControlName];
    if (control.errors?.['serverError']) {
      return control.errors?.['serverError'];
    }
    if (control.hasError('required')) {
      return 'You must enter a value.';
    }
    return null;
  }

  onHttpError(response: any) {
    if (response.error && !(response.error instanceof ProgressEvent)) {
      for (let k in response.error) {
        if (k in this.form.controls) {
          this.form.controls[k].setErrors({
            serverError: response.error[k][0]
          });
        } else if (typeof response.error[k] === 'string') {
          this.nonFieldErrors.push(response.error[k]);
        } else {
          this.nonFieldErrors.push(response.error[k][0]);
        }
      }
    } else {
      console.error(response);
    }
  }
}
