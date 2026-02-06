export interface Subscriber {
  start(): void;
}

export abstract class BaseSubscriber implements Subscriber {
  public abstract start(): void;
}
