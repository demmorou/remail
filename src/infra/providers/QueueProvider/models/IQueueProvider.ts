interface IQueueProvider {
  add(key: string, data: unknown): Promise<void>;
}

export default IQueueProvider;
