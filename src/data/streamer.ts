import { configStore } from "config/store";
import { DataError } from "errors/factory";
import { ERROR_MESSAGES } from "errors/messages";
import { existsSync, statSync } from "fs";
import { isValidUrl } from "./utils";

/**
 * DataStreamer Class
 */
export class DataStreamer {
  private _buffer: Buffer;
  private readonly _chunk: Buffer | null = null;

  private readonly _chunkSize: number;
  private _bufferSize: number;
  private _minDataSize: number;

  constructor() {
    // Initialize the default chunk size, buffer size and min data size
    this._chunkSize = configStore.get().dataStreaming.chunkSize;
    this._bufferSize = configStore.get().dataStreaming.bufferSize;
    this._minDataSize = configStore.get().dataStreaming.minDataSize;

    // Initialize the buffer and chunk
    this._buffer = Buffer.alloc(0);
  }

  /**
   * Flush the buffer to destination
   * @description This method flushes the buffer to the destination. It is called when the buffer is full or when the chunk is larger than the remaining space in the buffer.
   */
  public flush(): void {}

  /**
   * Check whether the file can be streamed
   * @param {string} filePath The path to the file
   * @description This method checks if the file can be streamed based on its size.
   * @returns {boolean} True if the file can be streamed, false otherwise
   */
  public canStreamFile(filePath: string): boolean {
    // Check if data streaming is enabled
    const isDataStreamingEnabled = configStore.get().dataStreaming.enabled;
    if (!isDataStreamingEnabled) return false;

    // Get the minimum data size from the config
    this._minDataSize = configStore.get().dataStreaming.minDataSize;

    // Check if the file exists
    const isFile = existsSync(filePath);
    if (!isFile)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_FILE_PATH, {
        filePath,
        isFile,
      });

    // Get the file size
    try {
      const fileStats = statSync(filePath);
      return fileStats.size > this._minDataSize;
    } catch (error) {
      throw new DataError(ERROR_MESSAGES.DATA.ERR_EVALUATING_FILE_STATS, {
        error,
      });
    }
  }

  /**
   * Check whether the url can be streamed
   * @param {string} url The url to check
   * @description This method checks if the url can be streamed based on its size.
   * @returns {boolean} True if the url can be streamed, false otherwise
   */
  public async canStreamUrl(url: string): Promise<boolean> {
    // Check if data streaming is enabled
    const isDataStreamingEnabled = configStore.get().dataStreaming.enabled;
    if (!isDataStreamingEnabled) return false;

    // Get the minimum data size from the config
    this._minDataSize = configStore.get().dataStreaming.minDataSize;

    // Check if the url is valid
    const isUrl = isValidUrl(url);
    if (!isUrl)
      throw new DataError(ERROR_MESSAGES.DATA.INVALID_JSON_URL, { url });

    // Get the url size
    try {
      const response = await fetch(url);
      const contentLength = response.headers.get("content-length");

      // If the content length is not present, we cannot determine the size
      if (!contentLength) return false;

      return parseInt(contentLength) > this._minDataSize;
    } catch (error) {
      throw new DataError(ERROR_MESSAGES.DATA.ERR_EVALUATING_URL_STATS, {
        error,
      });
    }
  }

  /**
   * Check whether the buffer is empty
   * @description This method checks if the buffer is full.
   * @returns {boolean} Whether the buffer is full or not
   */
  public isBufferFull(): boolean {
    // Get the value of the buffer size from the config
    this._bufferSize = configStore.get().dataStreaming.bufferSize;

    // Check if the buffer is full
    const currentBufferSize = this._buffer.byteLength;
    return currentBufferSize >= this._bufferSize;
  }

  /**
   * Add chunk data to the buffer
   * @description This method adds the current chunk data to the buffer. If the buffer is full, it will throw an error.
   */
  public addToBuffer(): void {
    // Check if the chunk is null
    if (!this._chunk) return;

    // Check if the chunk is larger than remaining space
    const remainingSpace = this._bufferSize - this._buffer.byteLength;
    if (this._chunk && this._chunk.byteLength > remainingSpace) this.flush();

    // Add the chunk to the buffer
    this._buffer = Buffer.concat([this._buffer, this._chunk]);
  }
}

export const dataStreamer = new DataStreamer();
