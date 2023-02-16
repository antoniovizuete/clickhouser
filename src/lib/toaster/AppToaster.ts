import {
  Toaster,
  Position,
  Intent,
  ToasterInstance,
  ToastProps,
} from "@blueprintjs/core";

class AppToasterClass {
  private _toaster: ToasterInstance;

  constructor(toaster: ToasterInstance) {
    this._toaster = toaster;
  }

  public info(props: ToastProps): string;
  public info(message: string): string;
  public info(propsOrMessage: ToastProps | string): string {
    return this._toaster.show({
      ...this.getParam(propsOrMessage),
      intent: Intent.PRIMARY,
    });
  }

  public success(props: ToastProps): string;
  public success(message: string): string;
  public success(propsOrMessage: ToastProps | string): string {
    return this._toaster.show({
      ...this.getParam(propsOrMessage),
      intent: Intent.SUCCESS,
    });
  }

  public warn(props: ToastProps): string;
  public warn(message: string): string;
  public warn(propsOrMessage: ToastProps | string): string {
    return this._toaster.show({
      ...this.getParam(propsOrMessage),
      intent: Intent.WARNING,
    });
  }

  public error(props: ToastProps): string;
  public error(message: string): string;
  public error(propsOrMessage: ToastProps | string): string {
    return this._toaster.show({
      ...this.getParam(propsOrMessage),
      intent: Intent.DANGER,
    });
  }

  private getParam(propsOrMessage: ToastProps | string): ToastProps {
    return typeof propsOrMessage === "string"
      ? { message: propsOrMessage }
      : { ...propsOrMessage };
  }

  public clear(): void {
    this._toaster.clear();
  }
}

const top = new AppToasterClass(Toaster.create({ position: Position.TOP }));
const bottomRight = new AppToasterClass(
  Toaster.create({ position: Position.BOTTOM_RIGHT })
);

const toasters = [top, bottomRight];

export const AppToaster = {
  top,
  clear: () => toasters.forEach((toaster) => toaster.clear()),
};
