import { isObject } from "./internals/is-object";

class GuidController {
  private id = 0;
  private objectStore = new WeakMap();
  private nonObjectStore = new Map();

  generate(value: any): string {
    const store = isObject(value) ? this.objectStore : this.nonObjectStore;

    let guid = store.get(value);

    if (guid === undefined) {
      guid = `w:${(this.id++).toString(36)}`
      store.set(value, guid);
    }
  
    return guid;
  }
}

let guidController: GuidController | undefined;

export default function guidFor(value: any, suffix?: string | number): string {
  if (!guidController) throw new Error('Wazapp: GUID controller has not been setup.');
  
  const guid =  guidController.generate(value);
  
  return suffix ? `${guid}-${suffix}` : guid;
}

export function setupGuid(): void {
  guidController = new GuidController();
}