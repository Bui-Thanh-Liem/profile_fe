/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface IPropBaseAction<T> {
  dataEdit?: T;
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
  onClose?: () => void;
}
