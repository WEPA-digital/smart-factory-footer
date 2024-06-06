class Config {
  version: string;
  title: string;

  constructor() {
    const config = structuredClone(window.wepaConfig);

    this.version = config.version;
    this.title = config.title;
  }
}

export const config = Object.freeze(new Config());
